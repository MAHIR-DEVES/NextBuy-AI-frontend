import { Star } from 'lucide-react';
import { SectionTitle } from './BasicInformationSection';

interface HighlightsSectionProps {
  highlights: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const HighlightsSection = ({
  highlights,
  onChange,
}: HighlightsSectionProps) => {
  return (
    <div className="space-y-4">
      <SectionTitle
        icon={<Star className="w-4 h-4 text-yellow-500" />}
        title="Product Highlights"
        subtitle="Key features and selling points"
      />

      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">
          Highlights (one per line)
        </label>
        <textarea
          name="highlights"
          value={highlights}
          onChange={onChange}
          rows={5}
          placeholder={`Breathable mesh upper\nLightweight design\nAnti-slip outsole\nComfortable cushioning\nSuitable for daily use`}
          className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none transition-all text-sm"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          💡 Tip: Write each highlight on a new line. They&apos;ll be used in
          product descriptions.
        </p>
      </div>
    </div>
  );
};
