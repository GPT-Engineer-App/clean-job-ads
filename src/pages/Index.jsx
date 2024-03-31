import React, { useState } from "react";
import { Box, Button, Container, Heading, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, VStack, HStack, Image } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [jobAds, setJobAds] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddJob = () => {
    setIsOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      title,
      description,
    };
    setJobAds([...jobAds, newJob]);
    setTitle("");
    setDescription("");
    setIsOpen(false);
  };

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Heading as="h1" size="xl" mb={8}>
        Job Ads
      </Heading>
      <Box mb={8}>
        <Button leftIcon={<FaPlus />} colorScheme="blue" onClick={handleAddJob}>
          Add Job Ad
        </Button>
      </Box>
      <VStack spacing={4} align="stretch">
        {jobAds.map((job) => (
          <Box key={job.id} p={4} borderWidth={1} borderRadius="md" cursor="pointer" onClick={() => handleJobClick(job)}>
            <Heading as="h2" size="md" mb={2}>
              {job.title}
            </Heading>
            <Text>{job.description}</Text>
          </Box>
        ))}
      </VStack>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Job Ad</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
              </FormControl>
              <Button type="submit" colorScheme="blue">
                Submit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={selectedJob !== null} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedJob?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{selectedJob?.description}</Text>
            <Image src="https://source.unsplash.com/random/?portrait%20professional" alt="Employee" mb={4} />
            <HStack>
              <Button colorScheme="blue">Apply</Button>
              <Button onClick={handleCloseModal}>Close</Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;
