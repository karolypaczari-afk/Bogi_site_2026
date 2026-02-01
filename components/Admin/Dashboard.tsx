
import React, { useState, useEffect } from 'react';
import { supabase, getAllSubmissions, getAllChatLeads, FormSubmission, ChatLead } from '../../lib/supabase';

const Dashboard: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
    const [chatLeads, setChatLeads] = useState<ChatLead[]>([]);
    const [activeTab, setActiveTab] = useState<'forms' | 'chat'>('forms');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkSession();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkSession = async () => {
        if (!supabase) return;
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            window.location.hash = '#login';
            return;
        }
        fetchData();
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const forms = await getAllSubmissions();
            const chats = await getAllChatLeads();
            setSubmissions(forms);
            setChatLeads(chats);
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch data');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
            window.location.hash = '#login';
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '-';
        return new Date(dateStr).toLocaleString('hu-HU');
    };

    if (isLoading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-serif font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={fetchData}
                                className="text-gray-500 hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Refresh
                            </button>
                            <button
                                onClick={handleLogout}
                                className="bg-gray-100 text-gray-700 hover:bg-red-50 hover:text-red-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4">
                        <div className="flex">
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                    <nav className="-mb-px flex space-x-8">
                        <button
                            onClick={() => setActiveTab('forms')}
                            className={`${activeTab === 'forms'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            Form Submissions ({submissions.length})
                        </button>
                        <button
                            onClick={() => setActiveTab('chat')}
                            className={`${activeTab === 'chat'
                                ? 'border-accent text-accent'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            Chat Leads ({chatLeads.length})
                        </button>
                    </nav>
                </div>

                {/* Data Tables */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg overflow-x-auto">
                    {activeTab === 'forms' ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {submissions.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">No submissions yet.</td>
                                    </tr>
                                ) : (
                                    submissions.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(item.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <a href={`mailto:${item.email}`} className="hover:text-accent">{item.email}</a>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={item.message}>
                                                {item.message || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.source || '-'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    ) : (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversation</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {chatLeads.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-gray-500 text-sm">No chat leads yet.</td>
                                    </tr>
                                ) : (
                                    chatLeads.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(item.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                <div>{item.name || 'Anonymous'}</div>
                                                <div className="text-xs text-gray-500">
                                                    {item.email && <a href={`mailto:${item.email}`} className="hover:text-accent mr-2">{item.email}</a>}
                                                    {item.linkedin_url && <a href={item.linkedin_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">LinkedIn</a>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                <div className="flex flex-col">
                                                    {item.company && <span><span className="font-semibold">Co:</span> {item.company}</span>}
                                                    {item.role && <span><span className="font-semibold">Role:</span> {item.role}</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={item.conversation_summary}>
                                                {item.conversation_summary || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {item.lead_score || 0}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
