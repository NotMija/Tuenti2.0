const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  createComment: async (postId, userId, text) => {
    return prisma.comment.create({
      data: {
        text,
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
  },

  getCommentsByPostId: async (postId) => {
    return prisma.comment.findMany({
      where: { postId },
      include: { user: true },
    });
  },

  getCommentById: async (commentId) => {
    return prisma.comment.findUnique({
      where: { id: commentId },
      include: { user: true },
    });
  },

  updateComment: async (commentId, text) => {
    return prisma.comment.update({
      where: { id: commentId },
      data: { text },
    });
  },

  deleteComment: async (commentId) => {
    return prisma.comment.delete({
      where: { id: commentId },
    });
  },
};
