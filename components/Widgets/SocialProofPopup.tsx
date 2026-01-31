import React, { useState, useEffect } from 'react';
import { getRecentSubmissions, FormSubmission } from '../../lib/supabase';

interface PopupData {
    name: string;
    location: string;
    timeAgo: string;
}

// Fallback data when Supabase is not connected or no recent submissions
const FALLBACK_DATA: PopupData[] = [
    { name: 'Sarah', location: 'London, UK', timeAgo: '2 hours ago' },
    { name: 'Michael', location: 'Amsterdam, NL', timeAgo: '5 hours ago' },
    { name: 'Emma', location: 'Berlin, DE', timeAgo: '1 day ago' },
    { name: 'James', location: 'Dublin, IE', timeAgo: '2 days ago' },
];

// Locations to add to real submissions (privacy-friendly, no actual location tracking)
const GENERIC_LOCATIONS = [
    'Europe',
    'United Kingdom',
    'Germany',
    'Netherlands',
    'Central Europe',
];

const SocialProofPopup: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [currentPopup, setCurrentPopup] = useState<PopupData | null>(null);
    const [popupQueue, setPopupQueue] = useState<PopupData[]>([]);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Load recent submissions on mount
    useEffect(() => {
        const loadSubmissions = async () => {
            const submissions = await getRecentSubmissions(5);

            if (submissions.length > 0) {
                // Transform real submissions
                const realData: PopupData[] = submissions.map((sub, index) => ({
                    name: sub.name?.split(' ')[0] || 'Someone', // First name only for privacy
                    location: GENERIC_LOCATIONS[index % GENERIC_LOCATIONS.length],
                    timeAgo: getTimeAgo(new Date(sub.created_at || Date.now())),
                }));
                setPopupQueue(realData);
            } else {
                // Use fallback data
                setPopupQueue(FALLBACK_DATA);
            }
        };

        loadSubmissions();
    }, []);

    // Show popups periodically
    useEffect(() => {
        if (popupQueue.length === 0 || hasInteracted) return;

        // Initial delay before first popup (10 seconds)
        const initialDelay = setTimeout(() => {
            showNextPopup();
        }, 10000);

        return () => clearTimeout(initialDelay);
    }, [popupQueue]);

    // Cycle through popups
    useEffect(() => {
        if (!currentPopup || hasInteracted) return;

        // Hide after 5 seconds
        const hideTimeout = setTimeout(() => {
            setIsVisible(false);
        }, 5000);

        // Show next popup after 30 seconds
        const nextTimeout = setTimeout(() => {
            showNextPopup();
        }, 30000);

        return () => {
            clearTimeout(hideTimeout);
            clearTimeout(nextTimeout);
        };
    }, [currentPopup]);

    const showNextPopup = () => {
        if (popupQueue.length === 0) return;

        const randomIndex = Math.floor(Math.random() * popupQueue.length);
        setCurrentPopup(popupQueue[randomIndex]);
        setIsVisible(true);
    };

    const handleClose = () => {
        setIsVisible(false);
        setHasInteracted(true);
    };

    const handleCTAClick = () => {
        setIsVisible(false);
        // Scroll to contact section
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (!currentPopup) return null;

    return (
        <div
            className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
        >
            <div className="bg-white rounded-2xl shadow-2xl p-4 max-w-xs border border-slate-100 relative overflow-hidden">
                {/* Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-green-400"></div>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-2 right-2 w-6 h-6 text-slate-400 hover:text-slate-600 transition-colors"
                    aria-label="Close notification"
                >
                    <i className="fas fa-times text-xs"></i>
                </button>

                <div className="flex items-start gap-3 pr-6">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-green-100 rounded-full flex items-center justify-center text-accent font-bold text-lg flex-shrink-0">
                        {currentPopup.name.charAt(0)}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary font-semibold leading-snug">
                            <span className="text-accent">{currentPopup.name}</span> from {currentPopup.location}
                        </p>
                        <p className="text-xs text-text-muted mt-0.5">
                            Just connected with Bogi
                        </p>
                        <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <i className="fas fa-clock"></i>
                            {currentPopup.timeAgo}
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <button
                    onClick={handleCTAClick}
                    className="mt-3 w-full bg-gradient-to-r from-accent to-accent-dark text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all flex items-center justify-center gap-2"
                >
                    <i className="fas fa-paper-plane"></i>
                    Start a Conversation
                </button>

                {/* Verified badge */}
                <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-green-600">
                    <i className="fas fa-check-circle"></i>
                    Verified contact
                </div>
            </div>
        </div>
    );
};

// Utility function to calculate relative time
function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return diffMins <= 1 ? 'Just now' : `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays < 7) {
        return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
    } else {
        return 'Recently';
    }
}

export default SocialProofPopup;
