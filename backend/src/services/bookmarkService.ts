import prisma from "../config/prisma";


// ========================
// CREATE BOOKMARK
// ========================
export const createBookmark = async (
  userId: string,
  topicId: string
) => {

  // Check if bookmark already exists
  const existingBookmark =
    await prisma.bookmark.findUnique({
      where: {
        userId_topicId: {
          userId,
          topicId
        }
      }
    });

  if (existingBookmark) {
    return existingBookmark;
  }

  // Create new bookmark
  const bookmark =
    await prisma.bookmark.create({
      data: {
        userId,
        topicId
      }
    });

  return bookmark;
};


// ========================
// GET BOOKMARKS
// ========================
export const getBookmarks = async (
  userId: string
) => {

  const bookmarks =
    await prisma.bookmark.findMany({
      where: {
        userId
      },
      include: {
        topic: true
      }
    });

  return bookmarks;
};


// ========================
// DELETE BOOKMARK
// ========================
export const deleteBookmark = async (
  userId: string,
  topicId: string
) => {

  return await prisma.bookmark.deleteMany({
    where: {
      userId,
      topicId
    }
  });

};
