import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

const NewestTeacher = () => {
  return (
    <Card className="p-5">
      <div className="flex justify-between items-center border-b p-3">
        <h1 className="text-xl font-bold leading-none text-gray-900">
          Our Newest Teacher
        </h1>
        <Link
          className="text-sm text-blue-800 hover:border-b border-blue-300"
          to={"#"}
        >
          View All
        </Link>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="candice"
              src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Candice Wu
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Software Engineer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="alexander"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Alexander
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Backend Developer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="emma"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=600&q=60"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Emma Willever
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              UI/UX Designer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="emma"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80"
            />
          </ListItemPrefix>
          <div>
            <Typography variant="h6" color="blue-gray">
              Cecileon
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              UI/UX Designer @ Material Tailwind
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
};

export default NewestTeacher;
