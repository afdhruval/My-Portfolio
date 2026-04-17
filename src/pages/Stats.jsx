import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import Card from '../components/Card';
import SectionNav from '../components/SectionNav';
import { Eye, Heart } from 'lucide-react';

const Stats = () => {
  const [pageViews, setPageViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [githubData, setGithubData] = useState({
    followers: 0,
    public_repos: 0,
    following: 0,
    hireable: false,
    totalStars: 0,
  });

  useEffect(() => {
    // Increment page views on EVERY visit
    const currentViews = parseInt(localStorage.getItem('portfolioPageViews') || '24');
    const newViews = currentViews + 1;
    localStorage.setItem('portfolioPageViews', newViews.toString());
    setPageViews(newViews);

    // Initialize likes
    const currentLikes = parseInt(localStorage.getItem('portfolioLikes') || '24');
    setLikes(currentLikes);

    // Check if user has already liked
    const userHasLiked = localStorage.getItem('portfolioUserHasLiked') === 'true';
    setHasLiked(userHasLiked);

    // Fetch GitHub Data (public API — no token required)
    const fetchGithubData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch('https://api.github.com/users/afdhruval');
        const userData = await userResponse.json();

        // Fetch all public repos to calculate total stars
        const reposResponse = await fetch('https://api.github.com/users/afdhruval/repos?per_page=100');
        const reposData = await reposResponse.json();

        const totalStars = Array.isArray(reposData)
          ? reposData.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0)
          : 0;

        setGithubData({
          followers: userData.followers || 0,
          public_repos: userData.public_repos || 0,
          following: userData.following || 0,
          hireable: userData.hireable || false,
          totalStars,
        });
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };

    fetchGithubData();
  }, []);

  const handleLike = () => {
    if (!hasLiked) {
      const newLikes = likes + 1;
      setLikes(newLikes);
      localStorage.setItem('portfolioLikes', newLikes.toString());
      localStorage.setItem('portfolioUserHasLiked', 'true');
      setHasLiked(true);
    }
  };

  return (
    <PageTransition>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">About this portfolio</h1>
        <p className="text-gray-soft mb-12">Insights and metrics about this portfolio website</p>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card hover={false} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-purple-400">
              <Eye size={24} />
              <h3 className="text-lg font-medium">Total Views</h3>
            </div>
            <p className="text-6xl font-bold text-purple-500 mb-2">{pageViews.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Unique page visits since Mar-2025</p>
            <p className="text-xs text-green-500 mt-2"></p>
          </Card>

          <Card hover={false} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4 text-pink-400">
              <Heart size={24} />
              <h3 className="text-lg font-medium">Appreciation Count</h3>
            </div>
            <p className="text-6xl font-bold text-pink-500 mb-2">{likes.toLocaleString()}</p>
            <button
              onClick={handleLike}
              disabled={hasLiked}
              className={`inline-flex items-center gap-2 mt-2 px-4 py-2 rounded-full transition-all ${hasLiked
                  ? 'bg-pink-900/20 text-pink-400 cursor-not-allowed'
                  : 'bg-pink-600 hover:bg-pink-500 text-white cursor-pointer'
                }`}
            >
              <Heart size={16} className={hasLiked ? 'fill-pink-400' : ''} />
              <span className="text-sm">{hasLiked ? 'Thank you!' : 'Like this portfolio'}</span>
            </button>
          </Card>
        </div>

        {/* GitHub Stats Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">GitHub Stats</h2>
          <p className="text-gray-soft mb-8">Insights and metrics about my GitHub profile</p>

          {/* GitHub Contribution Graph - Hardcoded SVG */}
          <Card hover={false} className="mb-6 flex justify-center items-center overflow-x-auto">
            <img
              src="/contribution-graph.svg"
              alt="GitHub Contribution Graph"
              className="w-full rounded-lg"
            />
          </Card>

          {/* GitHub Info Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card hover={false} className="text-center">
              <p className="text-sm text-gray-500 mb-2">Hireable</p>
              <p className="text-3xl font-bold text-green-500">Yes</p>
            </Card>
            <Card hover={false} className="text-center">
              <p className="text-sm text-gray-500 mb-2">Total Public Repositories</p>
              <p className="text-3xl font-bold text-white">{githubData.public_repos}</p>
            </Card>
            <Card hover={false} className="text-center">
              <p className="text-sm text-gray-500 mb-2">Followers</p>
              <p className="text-3xl font-bold text-white">{githubData.followers}</p>
            </Card>
            <Card hover={false} className="text-center">
              <p className="text-sm text-gray-500 mb-2">Following</p>
              <p className="text-3xl font-bold text-white">{githubData.following}</p>
            </Card>
          </div>

          {/* Stars card — full width below */}
          <div className="grid grid-cols-1 mt-4">
            <Card hover={false} className="text-center">
              <p className="text-sm text-gray-500 mb-2">Total Stars</p>
              <p className="text-3xl font-bold text-yellow-400">⭐ {githubData.totalStars}</p>
            </Card>
          </div>
        </div>

        <SectionNav prev={{ name: 'Contact', path: '/contact' }} next={{ name: 'Home', path: '/' }} />
      </div>
    </PageTransition>
  );
};

export default Stats;
