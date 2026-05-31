import { createClient } from '@sanity/client';
import mockData from '../data/mockContent.json';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-05-24';

const isSanityConfigured = !!projectId;

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false, // Set to false for instant real-time updates on publish
    })
  : null;

// Helper to check if Sanity is linked
export function getCMSStatus() {
  return {
    isConfigured: isSanityConfigured,
    provider: 'Sanity CMS',
    projectId: projectId || 'Not Configured',
    dataset,
  };
}

// Fetch Profile Data
export async function getProfile() {
  if (!client) {
    return mockData.profile;
  }
  try {
    const query = `*[_type == "profile" && _id == "profile"][0]{
      greeting,
      name,
      title,
      subtitle,
      email,
      location,
      "avatar": avatar.asset->url,
      skillsTitle,
      skillsSubtitle,
      socials {
        github,
        instagram,
        linkedin
      }
    }`;
    const data = await client.fetch(query);
    return data || mockData.profile;
  } catch (error) {
    console.error('Failed to fetch profile from Sanity, falling back to mock data:', error);
    return mockData.profile;
  }
}

// Fetch Skills Data
export async function getSkills() {
  if (!client) {
    return mockData.skills;
  }
  try {
    const query = `*[_type == "skill"] | order(category desc, level desc) {
      _id,
      title,
      category,
      level,
      glowColor
    }`;
    const data = await client.fetch(query);
    if (!data || data.length === 0) return mockData.skills;
    return data.map(item => ({
      id: item._id,
      title: item.title,
      category: item.category,
      level: item.level,
      glowColor: item.glowColor,
    }));
  } catch (error) {
    console.error('Failed to fetch skills from Sanity, falling back to mock data:', error);
    return mockData.skills;
  }
}

// Fetch Projects Data
export async function getProjects() {
  if (!client) {
    return mockData.projects;
  }
  try {
    const query = `*[_type == "project"] | order(featured desc, _createdAt desc) {
      _id,
      title,
      description,
      tags,
      "image": image.asset->url,
      liveUrl,
      githubUrl,
      featured
    }`;
    const data = await client.fetch(query);
    if (!data || data.length === 0) return mockData.projects;
    return data.map(item => ({
      id: item._id,
      title: item.title,
      description: item.description,
      tags: item.tags || [],
      image: item.image || '/images/project_aether.jpg', // fallback image
      liveUrl: item.liveUrl,
      githubUrl: item.githubUrl,
      featured: item.featured,
    }));
  } catch (error) {
    console.error('Failed to fetch projects from Sanity, falling back to mock data:', error);
    return mockData.projects;
  }
}
