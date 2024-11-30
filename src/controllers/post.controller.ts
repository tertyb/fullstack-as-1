import { Request, Response, Router } from 'express';
import { allPosts, createPost, getPostById, getPostsBysenderId } from '../services/post.service';

export const postRouter = Router();

postRouter.get('/', async (req: Request, res: Response) => {
  try {
    if (req.query.sender) {
      const senderId = req.query.sender as string;
      const posts = await getPostsBysenderId(senderId);
      res.json({ posts });

    } else {
      throw new Error('no sender specified')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.post('/create', async (req: Request, res: Response) => {
  try {
    if (req.query.sender) {
      const senderId = req.query.sender as string;
      const { text, image } = req.body;
      const createPostStatus = await createPost(senderId, text, image);

      res.json({ createPostStatus });

    } else {
      throw new Error('no sender specified')
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});


postRouter.get('/all', async (req: Request, res: Response) => {
  try {
    const posts = await allPosts();

    res.json({ posts });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

postRouter.get('/:postId', async (req: Request, res: Response) => {
  try {
    if (req.params.postId) {
      const post = await getPostById(req.params.postId);
      res.json({ post });

    } else {
      throw new Error('no postId specified')
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

// TODO: daniel add update post


