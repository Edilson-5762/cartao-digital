export function VideoBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <video
        className="h-full w-full object-cover"
        src="/video/background.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div
        data-testid="video-overlay"
        className="absolute inset-0 bg-graphite-950/80"
      />
    </div>
  );
}
