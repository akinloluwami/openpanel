'use client';

import { ChartSwitch } from '@/components/report/chart';
import { useEventQueryFilters } from '@/hooks/useEventQueryFilters';
import { cn } from '@/utils/cn';

import { Widget, WidgetBody } from '../Widget';
import { WidgetButtons, WidgetHead } from './overview-widget';
import { useOverviewOptions } from './useOverviewOptions';
import { useOverviewWidget } from './useOverviewWidget';

interface OverviewTopEventsProps {
  projectId: string;
}
export default function OverviewTopEvents({
  projectId,
}: OverviewTopEventsProps) {
  const { interval, range, previous } = useOverviewOptions();
  const [filters] = useEventQueryFilters();
  const [widget, setWidget, widgets] = useOverviewWidget('ev', {
    all: {
      title: 'Top events',
      btn: 'All',
      chart: {
        projectId,
        events: [
          {
            segment: 'event',
            filters: [
              ...filters,
              {
                id: 'ex_session',
                name: 'name',
                operator: 'isNot',
                value: ['session_start', 'session_end'],
              },
            ],
            id: 'A',
            name: '*',
          },
        ],
        breakdowns: [
          {
            id: 'A',
            name: 'name',
          },
        ],
        chartType: 'bar',
        lineType: 'monotone',
        interval: interval,
        name: 'Top sources',
        range: range,
        previous: previous,
        metric: 'sum',
      },
    },
  });

  return (
    <>
      <Widget className="col-span-6 md:col-span-3">
        <WidgetHead>
          <div className="title">{widget.title}</div>
          <WidgetButtons>
            {widgets.map((w) => (
              <button
                key={w.key}
                onClick={() => setWidget(w.key)}
                className={cn(w.key === widget.key && 'active')}
              >
                {w.btn}
              </button>
            ))}
          </WidgetButtons>
        </WidgetHead>
        <WidgetBody>
          <ChartSwitch hideID {...widget.chart} previous={false} />
        </WidgetBody>
      </Widget>
    </>
  );
}
