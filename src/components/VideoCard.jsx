import React from 'react';
import { Play, CheckCircle } from 'lucide-react';

export default function VideoCard({ video, onVideoClick }) {
  // Use YouTube thumbnail URL
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;

  return (
    <div className="video-card">
      {/* Thumbnail Shell */}
      <div className="thumbnail-container" onClick={() => onVideoClick(video)}>
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="thumbnail-image"
          loading="lazy"
        />
        <div className="duration-badge">{video.duration}</div>
        <div className="play-overlay">
          <div className="play-icon-circle">
            <Play size={20} fill="#000" color="#000" style={{ marginLeft: '2px' }} />
          </div>
        </div>
      </div>

      {/* Info Details */}
      <div className="video-info">
        <h4 className="video-title" onClick={() => onVideoClick(video)} title={video.title}>
          {video.title}
        </h4>

        {/* Uploader Row */}
        <div className="video-uploader">
          <span>{video.uploader}</span>
          <span className="uploader-verified">
            <CheckCircle size={10} fill="var(--accent-orange)" color="#000" />
          </span>
        </div>

        {/* Stats Row */}
        <div className="video-stats">
          <span>{video.views} views</span>
          <span className="video-rating">
            <span style={{ color: 'var(--rating-green)' }}>{video.rating}%</span>
          </span>
        </div>

        {/* PH Rating Progress Bar */}
        <div className="rating-bar-container">
          <div
            className="rating-bar-fill"
            style={{ width: `${video.rating}%` }}
          />
        </div>
      </div>
    </div>
  );
}
