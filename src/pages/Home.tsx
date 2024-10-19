import Carousel from "../components/ui/carousel";
import { StoryInfo } from "../types/story";

// placeholder image imports
import rj from "../assets/placeholder_images/rj.jpeg";
import plane from "../assets/placeholder_images/plane.jpg";
import whale from "../assets/placeholder_images/whale.jpg";
import tree from "../assets/placeholder_images/tree.jpeg";
import hacker from "../assets/placeholder_images/hacker.jpg";

export const stories: StoryInfo[] = [
  {
    id: '1',
    title: 'The Enchanted Forest',
    author: 'Alice Green',
    img: tree,
    rating: 4.8,
  },
  {
    id: '2',
    title: 'Space Odyssey',
    author: 'James Skywalker',
    img: plane,
    rating: 4.5,
  },
  {
    id: '3',
    title: 'Mystery of the Lost City',
    author: 'Sandra Night',
    img: hacker,
    rating: 4.9,
  },
  {
    id: '4',
    title: 'Journey to the Deep',
    author: 'Robert Ocean',
    img: whale,
    rating: 4.6,
  },
  {
    id: '5',
    title: 'Desert Mirage',
    author: 'Nina Sands',
    img: hacker,
    rating: 4.7,
  },
  {
    id: '6',
    title: 'The Dark Caverns',
    author: 'Tom Shade',
    img: rj,
    rating: 3.2,
  },
  {
    id: '7',
    title: 'Galactic Chronicles',
    author: 'Lucy Star',
    img: whale,
    rating: 4.1,
  },
  {
    id: '8',
    title: 'The Silent Forest',
    author: 'Mark Timber',
    img: tree,
    rating: 3.9,
  },
  {
    id: '9',
    title: 'Mountains Beyond',
    author: 'Eli Peaks',
    img: rj,
    rating: 4.3,
  },
  {
    id: '10',
    title: 'Whispers in the Wind',
    author: 'Lily Breeze',
    img: whale,
    rating: 2.8,
  },
  {
    id: '11',
    title: 'The Forgotten Island',
    author: 'Sam Shores',
    img: hacker,
    rating: 3.5,
  },
  {
    id: '12',
    title: 'Shadows of the Past',
    author: 'Diana Mist',
    img: tree,
    rating: 2.4,
  },
  {
    id: '13',
    title: 'Echoes of Eternity',
    author: 'Paul Time',
    img: plane,
    rating: 4.0,
  },
  {
    id: '14',
    title: 'The Broken Mirror',
    author: 'Helen Glass',
    img: rj,
    rating: 3.7,
  },
  {
    id: '15',
    title: 'Voyage to Nowhere',
    author: 'Isaac Sailor',
    img: whale,
    rating: 2.9,
  },
];

export const Home = () => {
  return (
    <>
      <Carousel title="New Releases" category="new" stories={stories} ></Carousel>
      <Carousel title="Top Rated" category="top" stories={stories}></Carousel>
    </>
  );
}
