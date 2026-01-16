import React from 'react';
import { Plus } from 'lucide-react';
import { NOTES_DATA } from '../data/messages';

const NotesBar = () => {
    return (
        <div className="scroll-hide" style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            overflowX: 'auto',
            marginBottom: '10px'
        }}>
            {NOTES_DATA.map((note) => (
                <div key={note.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: '80px',
                    position: 'relative'
                }}>
                    {/* Note Bubble */}
                    <div style={{
                        backgroundColor: 'white', // Theme aware usually, but white for now
                        padding: '8px 12px',
                        borderRadius: '16px',
                        marginBottom: '8px',
                        position: 'relative',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        maxWidth: '100px',
                        textAlign: 'center',
                        fontSize: '12px',
                        lineHeight: '1.2',
                        color: '#000',
                        fontWeight: '500' // slightly bolder text
                    }}>
                        {note.music && (
                            <div style={{ fontSize: '10px', color: '#666', marginBottom: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px' }}>
                                <span>ılıl</span>
                                <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '70px' }}>{note.music}</span>
                            </div>
                        )}
                        {note.noteText}

                        {/* Little bubble pointers */}
                        <div style={{
                            position: 'absolute',
                            bottom: '-4px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '8px',
                            height: '8px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }} />
                        <div style={{
                            position: 'absolute',
                            bottom: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '4px',
                            height: '4px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                        }} />
                    </div>

                    {/* Avatar Container */}
                    <div style={{ position: 'relative' }}>
                        <img
                            src={note.avatar}
                            style={{
                                width: '64px',
                                height: '64px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '1px solid var(--border-color)'
                            }}
                            alt={note.username}
                        />

                        {/* Status / Add Icon */}
                        {note.isMe ? (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                background: 'var(--story-gradient)', // Using standard gradient if available, or fallback
                                backgroundColor: '#f0f0f0',
                                borderRadius: '50%',
                                padding: '2px',
                                border: '2px solid var(--bg-primary)'
                            }}>
                                <div style={{
                                    backgroundColor: 'var(--text-secondary)', // Grey plus
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '16px',
                                    height: '16px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Plus size={12} strokeWidth={3} />
                                </div>
                            </div>
                        ) : note.isActive && (
                            <div style={{
                                position: 'absolute',
                                bottom: '4px',
                                right: '4px',
                                width: '14px',
                                height: '14px',
                                backgroundColor: '#10b981', // Green status
                                borderRadius: '50%',
                                border: '2px solid var(--bg-primary)'
                            }} />
                        )}
                    </div>

                    <span style={{
                        fontSize: '12px',
                        marginTop: '4px',
                        color: 'var(--text-secondary)',
                        maxWidth: '80px',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}>
                        {note.username}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default NotesBar;
