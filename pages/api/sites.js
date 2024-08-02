import connectDB from '@/libs/mongodb';
import Site from '../../models/Site';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
	case 'GET':
	  try {
		const sites = await Site.find({});
		res.status(200).json({ success: true, data: sites });
	  } catch (error) {
		res.status(400).json({ success: false });
	  }
	  break;
	case 'POST':
	  try {
		const site = await Site.create(req.body);
		res.status(201).json({ success: true, data: site });
	  } catch (error) {
		res.status(400).json({ success: false });
	  }
	  break;
	case 'PUT':
	  try {
		const { id } = req.query;
		const site = await Site.findByIdAndUpdate(id, req.body, {
		  new: true,
		  runValidators: true,
		});
		if (!site) {
		  return res.status(404).json({ success: false });
		}
		res.status(200).json({ success: true, data: site });
	  } catch (error) {
		res.status(400).json({ success: false });
	  }
	  break;
	case 'DELETE':
	  try {
		const { id } = req.query;
		const deletedSite = await Site.deleteOne({ _id: id });
		if (!deletedSite) {
		  return res.status(404).json({ success: false });
		}
		res.status(200).json({ success: true, data: {} });
	  } catch (error) {
		res.status(400).json({ success: false });
	  }
	  break;
	default:
	  res.status(400).json({ success: false });
	  break;
  }
}