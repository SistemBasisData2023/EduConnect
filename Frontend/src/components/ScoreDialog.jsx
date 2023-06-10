import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

export default function ScoreDialog({
  dialogOpen,
  setDialogOpen,
  handleDialogOpen,
  handleSubmitScore,
  submissionInput,
  setSubmissionInput,
}) {
  //   const [dialogOpen, setDialogOpen] = React.useState(false);
  //   const handleDialogOpen = () => setDialogOpen((cur) => !cur);

  return (
    <React.Fragment>
      <Dialog
        size="xs"
        open={dialogOpen}
        handler={handleDialogOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Input Score
            </Typography>
          </CardHeader>
          <form action="submit">
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Score"
                size="lg"
                onChange={(e) => setSubmissionInput(e.target.value)}
              />
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                onClick={(e) => handleSubmitScore(e, submissionInput)}
              >
                Submit
              </Button>
            </CardFooter>
          </form>
        </Card>
      </Dialog>
    </React.Fragment>
  );
}
