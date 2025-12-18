export const fetchDashboardStats = async () => {
  return {
    users: 1200,
    posts: 3000,
    reports: 120,
    announcements: 15,
  };
};

export const getPendingUsers = async () => [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

export const approveUser = async (id) => true;
export const rejectUser = async (id) => true;

export const getPosts = async () => [
  { id: 1, title: "Post 1" },
  { id: 2, title: "Post 2" },
];
export const deletePost = async (id) => true;

export const getAnnouncements = async () => [
  { id: 1, title: "Announcement 1" },
];
export const deleteAnnouncement = async (id) => true;

export const getReports = async () => [
  { id: 1, issue: "Report 1" },
  { id: 2, issue: "Report 2" },
];
export const resolveReport = async (id) => true;
