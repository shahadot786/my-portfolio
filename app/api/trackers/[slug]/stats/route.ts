import { NextRequest, NextResponse } from 'next/server';
import { Tracker } from '@/lib/models';
import { withErrorHandling } from '@/lib/api-utils';

// Public: Get computed analytics for a tracker
export const GET = withErrorHandling(async (req: NextRequest, { params }: { params: { slug: string } }) => {
    const tracker = await Tracker.findOne({ slug: params.slug });
    if (!tracker) {
        return NextResponse.json({ error: 'Tracker not found' }, { status: 404 });
    }

    const days = tracker.days || [];
    const completedDays = days.filter((d: { status: string }) => d.status === 'completed');
    const skippedDays = days.filter((d: { status: string }) => d.status === 'skipped');
    const inProgressDays = days.filter((d: { status: string }) => d.status === 'in-progress');
    const pendingDays = days.filter((d: { status: string }) => d.status === 'pending');

    // Total hours logged
    const totalHoursLogged = days.reduce((sum: number, d: { hoursLogged: number }) => sum + (d.hoursLogged || 0), 0);

    // Checklist stats
    const totalChecklistItems = days.reduce((sum: number, d: { checklist: { completed: boolean }[] }) =>
        sum + (d.checklist?.length || 0), 0);
    const completedChecklistItems = days.reduce((sum: number, d: { checklist: { completed: boolean }[] }) =>
        sum + (d.checklist?.filter((c: { completed: boolean }) => c.completed).length || 0), 0);

    // Streak calculation (consecutive completed days by dayNumber)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    // Sort by dayNumber for streak calculation
    const sortedDays = [...days].sort((a: { dayNumber: number }, b: { dayNumber: number }) => a.dayNumber - b.dayNumber);

    for (let i = 0; i < sortedDays.length; i++) {
        if (sortedDays[i].status === 'completed') {
            tempStreak++;
            longestStreak = Math.max(longestStreak, tempStreak);
        } else {
            tempStreak = 0;
        }
    }

    // Current streak: count from the last day backwards
    for (let i = sortedDays.length - 1; i >= 0; i--) {
        if (sortedDays[i].status === 'completed') {
            currentStreak++;
        } else {
            break;
        }
    }

    // Mood distribution
    const moodCounts: Record<string, number> = { great: 0, good: 0, neutral: 0, tough: 0 };
    days.forEach((d: { mood: string }) => {
        if (d.mood && d.mood in moodCounts) {
            moodCounts[d.mood]++;
        }
    });

    // Weekly breakdown (group by week number)
    const weeklyStats: { week: number; completed: number; total: number; hours: number }[] = [];
    const totalWeeks = Math.ceil(tracker.totalDays / 7);
    for (let w = 1; w <= totalWeeks; w++) {
        const weekDays = days.filter((d: { dayNumber: number }) =>
            d.dayNumber > (w - 1) * 7 && d.dayNumber <= w * 7
        );
        weeklyStats.push({
            week: w,
            completed: weekDays.filter((d: { status: string }) => d.status === 'completed').length,
            total: weekDays.length,
            hours: weekDays.reduce((s: number, d: { hoursLogged: number }) => s + (d.hoursLogged || 0), 0),
        });
    }

    // Monthly breakdown
    const monthlyStats: { month: number; completed: number; total: number; hours: number }[] = [];
    const totalMonths = Math.ceil(tracker.totalDays / 30);
    for (let m = 1; m <= totalMonths; m++) {
        const monthDays = days.filter((d: { dayNumber: number }) =>
            d.dayNumber > (m - 1) * 30 && d.dayNumber <= m * 30
        );
        monthlyStats.push({
            month: m,
            completed: monthDays.filter((d: { status: string }) => d.status === 'completed').length,
            total: monthDays.length,
            hours: monthDays.reduce((s: number, d: { hoursLogged: number }) => s + (d.hoursLogged || 0), 0),
        });
    }

    // Completion percentage
    const completionPercent = tracker.totalDays > 0
        ? Math.round((completedDays.length / tracker.totalDays) * 100)
        : 0;

    const stats = {
        totalDays: tracker.totalDays,
        daysCompleted: completedDays.length,
        daysSkipped: skippedDays.length,
        daysInProgress: inProgressDays.length,
        daysPending: pendingDays.length,
        daysRemaining: tracker.totalDays - completedDays.length - skippedDays.length,
        completionPercent,
        totalHoursLogged,
        targetHours: tracker.totalDays * tracker.dailyHours,
        currentStreak,
        longestStreak,
        totalChecklistItems,
        completedChecklistItems,
        moodCounts,
        weeklyStats,
        monthlyStats,
    };

    return NextResponse.json({ success: true, stats });
});
