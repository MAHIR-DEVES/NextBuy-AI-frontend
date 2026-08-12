'use client';

import React, { useEffect, useState } from 'react';

import { getAnalytics } from '@/services/analytics.service';
import type { AnalyticsData } from '@/types/analytics.type';
import AnalyticsSkeleton from './AnalyticsSkeleton';
import AnalyticsFilters from './AnalyticsFilters';
import AnalyticsSummaryCards from './AnalyticsSummaryCards';
import AnalyticsCharts from './AnalyticsCharts';
import AnalyticsLists from './AnalyticsLists';

const Analytics = () => {
  const currentYear = new Date().getFullYear();

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState<number | undefined>(undefined);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      const response = await getAnalytics({
        year,
        month,
      });

      setAnalytics(response.data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [year, month]);

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (!analytics) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-title">
            No analytics data
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Analytics data could not be loaded.
          </p>

          <button
            onClick={fetchAnalytics}
            className="mt-4 rounded-md bg-button px-5 py-2 text-sm font-medium text-button-text transition hover:bg-button-hover"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header + Filters */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold ">Analytics Dashboard</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your orders, revenue and product performance.
          </p>
        </div>

        <AnalyticsFilters
          year={year}
          month={month}
          currentYear={currentYear}
          onYearChange={setYear}
          onMonthChange={setMonth}
        />
      </div>

      {/* Summary */}
      <AnalyticsSummaryCards summary={analytics.summary} />

      {/* Charts */}
      <AnalyticsCharts analytics={analytics} />

      {/* Lists */}
      <AnalyticsLists analytics={analytics} />
    </div>
  );
};

export default Analytics;
