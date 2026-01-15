import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

const EXPLORE_DATA = [
    'https://images.unsplash.com/photo-1549221193-456040a45ee2?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1493238792040-e7141f55024c?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=500&auto=format&fit=crop'
];

const CELEBRITY_DATA = [
    { name: 'Cristiano Ronaldo', id: 'cristiano', avatar: 'https://images.unsplash.com/photo-1549476464-37392f717541?q=80&w=150&auto=format&fit=crop', followers: '615M' },
    { name: 'Lionel Messi', id: 'leomessi', avatar: 'https://images.unsplash.com/photo-1542652694-40abf526446e?q=80&w=150&auto=format&fit=crop', followers: '495M' },
    { name: 'Selena Gomez', id: 'selenagomez', avatar: 'https://images.unsplash.com/photo-1520315342629-6ea920342047?q=80&w=150&auto=format&fit=crop', followers: '430M' },
    { name: 'Kylie Jenner', id: 'kyliejenner', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=150&auto=format&fit=crop', followers: '400M' },
    { name: 'Virat Kohli', id: 'virat.kohli', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop', followers: '265M' },
    { name: 'The Rock', id: 'therock', avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=150&auto=format&fit=crop', followers: '395M' },
    { name: 'Ariana Grande', id: 'arianagrande', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop', followers: '380M' },
    { name: 'Taylor Swift', id: 'taylorswift', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=150&auto=format&fit=crop', followers: '280M' }
];

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [followedIds, setFollowedIds] = useState(new Set());
    const [blockedIds, setBlockedIds] = useState(new Set());

    const toggleFollow = (id) => {
        setFollowedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const toggleBlock = (id) => {
        setBlockedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const filteredCelebs = searchQuery.trim() === ''
        ? []
        : CELEBRITY_DATA.filter(cele =>
            (cele.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cele.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
            !blockedIds.has(cele.id)
        );

    return (
        <div style={{ padding: '0 0 20px', height: '100%', overflowY: 'auto' }}>
            {/* Search Bar Container */}
            <div className="glass" style={{
                padding: '12px 16px',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                borderBottom: '1px solid var(--border-color)'
            }}>
                <div style={{
                    backgroundColor: 'var(--surface-color)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <SearchIcon size={20} color="var(--text-secondary)" />
                    <input
                        type="text"
                        placeholder="Search celebrity ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#fff',
                            fontSize: '16px',
                            outline: 'none',
                            width: '100%'
                        }}
                    />
                    {searchQuery && (
                        <X
                            size={18}
                            color="var(--text-secondary)"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setSearchQuery('')}
                        />
                    )}
                </div>
            </div>

            {/* Results or Grid */}
            {searchQuery.trim() !== '' ? (
                <div style={{ padding: '8px 0' }}>
                    {filteredCelebs.length > 0 ? (
                        filteredCelebs.map((cele) => (
                            <div key={cele.id} style={{
                                padding: '8px 16px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                borderBottom: '1px solid #111'
                            }}>
                                <img
                                    src={cele.avatar}
                                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
                                    alt={cele.name}
                                />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{cele.id}</div>
                                    <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{cele.name} • {cele.followers}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={() => toggleFollow(cele.id)}
                                        style={{
                                            background: followedIds.has(cele.id) ? '#333' : 'var(--accent-color)',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            padding: '6px 12px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {followedIds.has(cele.id) ? 'Following' : 'Follow'}
                                    </button>
                                    <button
                                        style={{
                                            background: '#333',
                                            color: '#fff',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '6px 12px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Message
                                    </button>
                                    <button
                                        onClick={() => toggleBlock(cele.id)}
                                        style={{
                                            background: '#333',
                                            color: '#ff3b30',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            borderRadius: '8px',
                                            padding: '6px 12px',
                                            fontSize: '13px',
                                            fontWeight: '600',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Block
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No celebrity found with ID "{searchQuery}"
                        </div>
                    )}
                </div>
            ) : (
                /* Explore Grid */
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '2px',
                    paddingTop: '2px'
                }}>
                    {EXPLORE_DATA.map((img, index) => (
                        <div
                            key={index}
                            className="interactive"
                            style={{
                                aspectRatio: '1/1',
                                overflow: 'hidden',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                        >
                            <img
                                src={img}
                                alt={`Explore ${index}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
