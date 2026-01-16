import { STORIES } from '../data/stories';

const StoryBar = ({ onStoryClick }) => {
    return (
        <div className="scroll-hide" style={{
            display: 'flex',
            gap: '12px',
            padding: '12px 16px',
            overflowX: 'auto',
            borderBottom: '1px solid var(--border-color)'
        }}>
            {STORIES.map((story, index) => (
                <div
                    key={story.id}
                    className="interactive"
                    onClick={() => onStoryClick && onStoryClick(index)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                    }}
                >
                    <div className="story-ring">
                        <div className="story-inner">
                            <img
                                src={story.avatar}
                                className="avatar"
                                style={{ width: '60px', height: '60px' }}
                                alt={story.name}
                            />
                        </div>
                    </div>
                    <span style={{
                        fontSize: '11px',
                        color: 'var(--text-secondary)',
                        maxWidth: '65px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }}>
                        {story.name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default StoryBar;
