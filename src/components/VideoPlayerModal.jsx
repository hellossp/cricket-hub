import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Download, Plus, Heart, X, MessageSquare, Lock } from 'lucide-react';

export default function VideoPlayerModal({ video, onClose, relatedVideos, onVideoClick, onTagClick }) {
  const [likesState, setLikesState] = useState(null); // 'like', 'dislike', or null
  const [ratingPercent, setRatingPercent] = useState(video.rating);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState('');

  // Reset states when the active video changes
  useEffect(() => {
    setLikesState(null);
    setRatingPercent(video.rating);
    setIsSubscribed(false);
    setComments(video.comments || []);
    setNewCommentText('');
    
    // Scroll modal container to top
    const modal = document.querySelector('.modal-overlay');
    if (modal) modal.scrollTop = 0;
  }, [video]);

  const handleLike = () => {
    if (likesState === 'like') {
      setLikesState(null);
      setRatingPercent(video.rating);
    } else {
      setLikesState('like');
      // Mock adjustment
      setRatingPercent(Math.min(100, video.rating + 1));
    }
  };

  const handleDislike = () => {
    if (likesState === 'dislike') {
      setLikesState(null);
      setRatingPercent(video.rating);
    } else {
      setLikesState('dislike');
      setRatingPercent(Math.max(0, video.rating - 2));
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment = {
      username: "CricketConnoisseur_42",
      text: newCommentText.trim(),
      likes: 0,
      time: "Just now"
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
  };

  const handleCommentLike = (index) => {
    const updated = [...comments];
    updated[index] = {
      ...updated[index],
      likes: updated[index].likes + 1
    };
    setComments(updated);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <X size={20} />
        </button>

        {/* Video Player Mock Error Screen */}
        <div className="player-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', padding: '40px', textAlign: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', maxWidth: '500px' }}>
            <div 
              style={{ 
                width: '60px', 
                height: '60px', 
                borderRadius: '50%', 
                backgroundColor: 'rgba(255, 153, 0, 0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--accent-orange)',
                marginBottom: '10px'
              }}
            >
              <Lock size={28} />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', fontFamily: 'var(--font-logo)' }}>
              Video Unavailable
            </h3>
            <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              I know you already have a VPN that you only use for about 2 minutes a day. Just connect it to stream this.
            </p>
          </div>
        </div>

        {/* Info Grid (Player left, Related right) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div className="player-details" style={{ flex: '1 1 650px', maxWidth: '100%' }}>
            <h2 className="player-title">{video.title}</h2>

            {/* Action Bar */}
            <div className="player-action-bar">
              <div className="player-views-date">
                <span style={{ fontWeight: '700' }}>{video.views} Views</span>
                <span style={{ margin: '0 8px', color: '#444' }}>•</span>
                <span>Uploaded {video.uploadDate}</span>
              </div>

              <div className="player-actions">
                {/* Like Button */}
                <button
                  className={`action-btn ${likesState === 'like' ? 'active-like' : ''}`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={14} />
                  <span>{ratingPercent}%</span>
                </button>

                {/* Dislike Button */}
                <button
                  className={`action-btn ${likesState === 'dislike' ? 'active-dislike' : ''}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={14} />
                </button>

                {/* Share */}
                <button className="action-btn" onClick={() => alert("Copied video link to clipboard! (Parody)")}>
                  <Share2 size={14} />
                  <span>Share</span>
                </button>

                {/* Download */}
                <button className="action-btn" onClick={() => alert("Premium required to download full 4K slow-mo cover drives.")}>
                  <Download size={14} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Uploader Row */}
            <div className="uploader-info-row">
              <div className="uploader-profile">
                <div className="uploader-avatar">
                  {video.uploader.charAt(0).toUpperCase()}
                </div>
                <div className="uploader-text">
                  <span className="uploader-name">{video.uploader}</span>
                  <span className="uploader-subscribers">840K Subscribers</span>
                </div>
                <button
                  className="btn-primary"
                  style={{
                    marginLeft: '15px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    backgroundColor: isSubscribed ? 'var(--bg-tertiary)' : 'var(--accent-orange)',
                    color: isSubscribed ? 'var(--text-primary)' : '#000'
                  }}
                  onClick={() => setIsSubscribed(!isSubscribed)}
                >
                  {isSubscribed ? 'Subscribed' : 'Subscribe'}
                </button>
              </div>

              {/* Tags */}
              <div className="tags-container">
                {video.tags.map((tag) => (
                  <button
                    key={tag}
                    className="video-tag"
                    onClick={() => {
                      onTagClick(tag);
                      onClose();
                    }}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="video-description">
              <p>{video.description}</p>
            </div>

            {/* Comments Box */}
            <div className="comments-section">
              <h3 className="comments-header">
                <MessageSquare size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />
                Comments ({comments.length})
              </h3>

              {/* Comment Submission */}
              <div className="comment-input-box">
                <div className="user-avatar-placeholder">CC</div>
                <form onSubmit={handleCommentSubmit} className="comment-form">
                  <textarea
                    placeholder="Add a public comment..."
                    className="comment-textarea"
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                  />
                  <button type="submit" className="btn-post-comment">Post Comment</button>
                </form>
              </div>

              {/* Comments List */}
              <div className="comments-list">
                {comments.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment, index) => (
                    <div key={index} className="comment-item">
                      <div className="comment-avatar">
                        {comment.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="comment-content">
                        <div className="comment-user-row">
                          <span className="comment-username">{comment.username}</span>
                          <span className="comment-time">{comment.time}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        <div className="comment-actions">
                          <button
                            className="comment-action-btn"
                            onClick={() => handleCommentLike(index)}
                          >
                            <ThumbsUp size={11} />
                            <span>{comment.likes}</span>
                          </button>
                          <span>•</span>
                          <button className="comment-action-btn">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Related Sidebar */}
          <div
            style={{
              flex: '1 1 300px',
              maxWidth: '100%',
              padding: '20px',
              borderLeft: '1px solid var(--border-color)',
              backgroundColor: '#0c0c0c'
            }}
          >
            <h3 style={{ fontSize: '15px', marginBottom: '15px', color: 'var(--text-primary)', fontFamily: 'var(--font-logo)' }}>
              Related Replays
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {relatedVideos.map((rv) => {
                const rvThumb = `https://img.youtube.com/vi/${rv.youtubeId}/hqdefault.jpg`;
                return (
                  <div
                    key={rv.id}
                    style={{ display: 'flex', gap: '10px', cursor: 'pointer' }}
                    onClick={() => onVideoClick(rv)}
                  >
                    <div style={{ position: 'relative', width: '120px', height: '68px', flexShrink: 0, backgroundColor: '#000', borderRadius: '4px', overflow: 'hidden' }}>
                      <img src={rvThumb} alt={rv.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div className="duration-badge" style={{ padding: '1px 3px', fontSize: '9px', bottom: '4px', right: '4px' }}>
                        {rv.duration}
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: '700', lineHeight: '1.2', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', color: '#fff' }}>
                        {rv.title}
                      </h4>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>
                        <div>{rv.uploader}</div>
                        <div>{rv.views} • {rv.rating}%</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
