import React from 'react';
import { ArrowLeft, Edit, Search, Camera } from 'lucide-react';
import NotesBar from './NotesBar';
import { MESSAGES_DATA } from '../data/messages';

const MessagesView = ({ onBack }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                position: 'sticky',
                top: 0,
                zIndex: 10,
                backgroundColor: 'var(--bg-primary)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <ArrowLeft size={24} className="interactive" onClick={onBack} style={{ cursor: 'pointer' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0 }}>i_md_aashik</h1>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                        <div style={{
                            width: '8px',
                            height: '8px',
                            backgroundColor: '#ff3040',
                            borderRadius: '50%',
                            marginLeft: '4px'
                        }} />
                    </div>
                </div>
                <Edit size={24} className="interactive" style={{ cursor: 'pointer' }} />
            </div>

            {/* Content Scroll Container */}
            <div className="scroll-hide" style={{ flex: 1, overflowY: 'auto' }}>

                {/* Search Bar */}
                <div style={{ padding: '0 16px 12px 16px' }}>
                    <div style={{
                        backgroundColor: '#f1f1f1', // Standard light grey for search
                        borderRadius: '12px',
                        padding: '10px 16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        color: 'var(--text-secondary)'
                    }}>
                        <Search size={18} />
                        <span style={{ fontSize: '16px' }}>Search</span>
                    </div>
                </div>

                {/* Notes Section */}
                <NotesBar />

                {/* Messages List Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 16px 16px 16px'
                }}>
                    <span style={{ fontSize: '16px', fontWeight: '700' }}>Messages</span>
                    <span style={{ fontSize: '16px', color: 'var(--blue-link)', fontWeight: '600', cursor: 'pointer' }}>Requests</span>
                </div>

                {/* Messages List */}
                <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '20px' }}>
                    {MESSAGES_DATA.map(msg => (
                        <div key={msg.id} className="interactive" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 16px',
                            cursor: 'pointer'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src={msg.avatar}
                                        style={{
                                            width: '56px',
                                            height: '56px',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                        alt={msg.username}
                                    />
                                    {msg.isActive && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '2px',
                                            right: '2px',
                                            width: '14px',
                                            height: '14px',
                                            backgroundColor: '#10b981',
                                            borderRadius: '50%',
                                            border: '2px solid var(--bg-primary)'
                                        }} />
                                    )}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <span style={{ fontSize: '14px', fontWeight: msg.isUnread ? '700' : '400' }}>
                                            {msg.username}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: msg.isUnread ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        <span style={{
                                            fontWeight: msg.isUnread ? '700' : '400',
                                            maxWidth: '180px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}>
                                            {msg.lastMessage}
                                        </span>
                                        {msg.time && (
                                            <>
                                                <span>·</span>
                                                <span>{msg.time}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Right Side Icons */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {msg.isUnread && (
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        backgroundColor: 'var(--blue-link)',
                                        borderRadius: '50%'
                                    }} />
                                )}
                                <Camera size={24} style={{ color: 'var(--text-secondary)' }} />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default MessagesView;
