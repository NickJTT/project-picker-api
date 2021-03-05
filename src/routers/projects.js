import { Router } from 'express';
import ProjectsController from '../controllers/ProjectsController';
import authorization from '../middleware/authorization';

const router = Router();

router.post('/', authorization, async (req, res) => {
  try {
    const id = await ProjectsController.insert(req.id, req.body.name);
    const success = true;
    const data = { success, id };
    return res.json(data);
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.get('/', authorization, async (req, res) => {
  try {
    const projects = await ProjectsController.select(req.id);
    const success = true;
    const data = { success, projects };
    return res.json(data);
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.get('/:id', authorization, async (req, res) => {
  try {
    const project = await ProjectsController.selectById(req.id, req.params.id);
    const data = project ? { success: true, project } : { success: false };
    return res.json(data);
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.put('/:id', authorization, async (req, res) => {
  try {
    const success = await ProjectsController.update(req.id, req.params.id, req.body.name);
    const data = { success };
    return res.json(data);
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

router.delete('/:id', authorization, async (req, res) => {
  try {
    const success = await ProjectsController.delete(req.id, req.params.id);
    const data = { success };
    return res.json(data);
  } catch (exception) {
    console.error(exception.message);
    const success = false;
    const message = 'Server Error!';
    const data = { success, message };
    return res.status(500).json(data);
  }
});

export default router;
