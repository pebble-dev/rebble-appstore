import { useState, useRef, useEffect } from 'react';
import { useFetcher } from 'react-router';
import Settings from "../icons/settings.svg?react";

const HARDWARE_OPTIONS = [
  { value: '', label: 'All watches' },
  { value: 'aplite', label: 'Pebble / Pebble Steel' },
  { value: 'basalt', label: 'Pebble Time / Time Steel' },
  { value: 'chalk', label: 'Pebble Time Round' },
  { value: 'diorite', label: 'Pebble 2' },
  { value: 'emery', label: 'Pebble Time 2' },
];

const PLATFORM_OPTIONS = [
  { value: '', label: 'All platforms' },
  { value: 'android', label: 'Android' },
  { value: 'ios', label: 'iOS' },
];

const LANGUAGE_OPTIONS = [
  { value: '', label: 'English' },
  { value: 'de_DE', label: 'Deutsch' },
  { value: 'es_ES', label: 'Español' },
  { value: 'fr_FR', label: 'Français' },
  { value: 'nl_NL', label: 'Nederlands' },
  { value: 'pl_PL', label: 'Polski' },
  { value: 'zh_CN', label: '中文 (简体)' },
  { value: 'zh_TW', label: '中文 (繁體)' },
];

interface QuickSettingsProps {
  hardware: string;
  platform: string;
  language: string;
}

export default function QuickSettings({ hardware, platform, language }: QuickSettingsProps) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const fetcher = useFetcher();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  function handleChange(name: string, value: string) {
    const formData = new FormData();
    formData.set('hardware', hardware);
    formData.set('platform', platform);
    formData.set('language', language);
    formData.set(name, value);
    fetcher.submit(formData, { method: 'post', action: '/settings' });
  }

  return (
    <div class="quick-settings" ref={panelRef}>
      <button
        class="quick-settings-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Quick settings"
        aria-expanded={open}
      >
        <Settings />
      </button>
      {open && (
        <div class="quick-settings-panel">
          <div class="quick-settings-group">
            <label>Watch</label>
            <select
              value={hardware}
              onChange={(e) => handleChange('hardware', e.target.value)}
            >
              {HARDWARE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div class="quick-settings-group">
            <label>Phone</label>
            <select
              value={platform}
              onChange={(e) => handleChange('platform', e.target.value)}
            >
              {PLATFORM_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div class="quick-settings-group">
            <label>Language</label>
            <select
              value={language}
              onChange={(e) => handleChange('language', e.target.value)}
            >
              {LANGUAGE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <style>{`
        .quick-settings {
          position: relative;
        }
        .quick-settings-toggle {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--as-fg-primary);
          padding: 0.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
        }
        .quick-settings-toggle:hover {
          background-color: var(--as-bg-tertiary);
        }
        .quick-settings-panel {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          background: var(--as-bg-secondary);
          border: 1px solid var(--as-border-primary);
          border-radius: 1rem;
          padding: 1.5rem;
          min-width: 16rem;
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        .quick-settings-group {
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
        }
        .quick-settings-group label {
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--as-fg-tertiary);
        }
        .quick-settings-group select {
          appearance: none;
          background: var(--as-bg-primary);
          color: var(--as-fg-primary);
          border: 1px solid var(--as-border-primary);
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          cursor: pointer;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23999' stroke-width='1.5' fill='none'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          padding-right: 2rem;
        }
        .quick-settings-group select:hover {
          border-color: var(--as-brand);
        }
        .quick-settings-group select:focus {
          outline: 2px solid var(--as-brand);
          outline-offset: -1px;
        }
      `}</style>
    </div>
  );
}
