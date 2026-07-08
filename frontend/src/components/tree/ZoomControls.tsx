"use client";

import {
    Maximize2,
    RotateCcw,
    ZoomIn,
    ZoomOut,
} from "lucide-react";

interface ZoomControlsProps {
  zoom: number;
  minZoom?: number;
  maxZoom?: number;

  onZoomIn: () => void;
  onZoomOut: () => void;

  onZoomChange: (value: number) => void;

  onReset: () => void;

  onFullscreen?: () => void;
}

export default function ZoomControls({
  zoom,
  minZoom = 50,
  maxZoom = 200,

  onZoomIn,
  onZoomOut,
  onZoomChange,

  onReset,
  onFullscreen,
}: ZoomControlsProps) {
  const percentage = Math.round(zoom);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-xl shadow-2xl">

      {/* Zoom Out */}
      <button
        type="button"
        onClick={onZoomOut}
        disabled={percentage <= minZoom}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ZoomOut className="h-5 w-5 text-white" />
      </button>

      {/* Slider */}
      <div className="flex w-56 flex-col gap-2">

        <input
          type="range"
          min={minZoom}
          max={maxZoom}
          value={percentage}
          onChange={(e) => onZoomChange(Number(e.target.value))}
          className="h-2 w-full cursor-pointer accent-purple-500"
        />

        <div className="flex justify-between text-xs text-gray-400">
          <span>{minZoom}%</span>

          <span className="font-semibold text-white">
            {percentage}%
          </span>

          <span>{maxZoom}%</span>
        </div>

      </div>

      {/* Zoom In */}
      <button
        type="button"
        onClick={onZoomIn}
        disabled={percentage >= maxZoom}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ZoomIn className="h-5 w-5 text-white" />
      </button>

      <div className="h-8 w-px bg-white/10" />

      {/* Reset */}
      <button
        type="button"
        onClick={onReset}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-orange-500/20 hover:border-orange-500/40 hover:scale-105"
        title="Reset View"
      >
        <RotateCcw className="h-5 w-5 text-orange-400" />
      </button>

      {/* Fullscreen */}
      {onFullscreen && (
        <button
          type="button"
          onClick={onFullscreen}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:bg-green-500/20 hover:border-green-500/40 hover:scale-105"
          title="Fullscreen"
        >
          <Maximize2 className="h-5 w-5 text-green-400" />
        </button>
      )}
    </div>
  );
}
