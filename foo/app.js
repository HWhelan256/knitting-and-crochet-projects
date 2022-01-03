import express from 'express';
import path from 'path';

import __dirname  from './dirname.js';
import cookieParser  from 'cookie-parser';
import cors  from 'cors';
import logger  from 'morgan';

import projectsRouter  from './routes/projects.js';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use('/projects', projectsRouter);

app.use(function (req, res, next) {
  res.status(404).json({message: "We couldn't find what you were looking for 😞"})
})

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).json(err)
})

export const projects = [
  {
    id: 1,
    project_name: "OpArt",
    craft: "Knitting",
    pattern: "OpArt by Melissa Dominguez",
    status: "Finished",
    yarn: "King Cole Bamboo Cotton Solids",
    notes: "Needle size 4.5mm. Baby blanket for a friend.",
    photo: "https://images4-f.ravelrycache.com/uploads/MoonDancer256/807879854/PXL_20210921_114511755_medium2.jpg",
  },
  {
    id: 2,
    project_name: "Jaywalker",
    craft: "Knitting",
    pattern: "Jaywalker by Grumperina",
    status: "Finished",
    yarn: "Dye Candy MSC Sock",
    notes: "76st, 2.5mm needles, Cashmere socks for my daughter.",
    photo: "https://images4-g.ravelrycache.com/uploads/MoonDancer256/765356801/PXL_20210212_103818949_medium2.jpg",
  },
  {
    id: 3,
    project_name: "Abigail Infant Sweater",
    craft: "Crochet",
    pattern: "Abigail Infant Sweater by Lorene Haythorn Eppolite- Cre8tion Crochet",
    status: "Finished",
    yarn: "King Cole Bamboo Cotton Solids",
    notes: "Hook size 4mm, Ch53 to start",
    photo: "https://images4-g.ravelrycache.com/uploads/MoonDancer256/250149774/IMG_59773473845213_2_medium2.jpg",
  },
  {
    id: 4,
    project_name: "Two at a time socks",
    craft: "Knitting",
    pattern: "None",
    status: "In Progress",
    yarn: "The Dotty Wool Co. High Twist Superwash",
    notes: "First attempt doing two at a time socks",
    photo: "https://images4-f.ravelrycache.com/uploads/MoonDancer256/812120559/PXL_20211013_122312395.PORTRAIT_medium2.jpg",
  },
];

export default app;
