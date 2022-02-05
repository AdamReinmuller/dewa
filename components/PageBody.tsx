import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
  ListIcon,
  AspectRatio,
} from "@chakra-ui/react";

import { TriangleIcon } from "./icons";

type AProps = {
  href: string;
};

type ImgProps = {
  src: string;
  alt: string;
  title: string;
};

const A: FC<AProps> = ({ children, href }) => {
  return href.startsWith("/") || href === "" ? (
    <Link href={href}>
      <a>{children}</a>
    </Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const Img: FC<ImgProps> = ({ src, alt, title }) => {
  const validSrc = src.replace("public/", "");

  return (
    <AspectRatio ratio={16 / 9} position="relative">
      <a target="_blank" href={validSrc} rel="noreferrer">
        <Image
          src={validSrc}
          alt={alt}
          title={title}
          layout="fill"
          objectFit="contain"
        />
      </a>
    </AspectRatio>
  );
};

const H1: FC = ({ children }) => {
  return (
    <Heading variant="hero" as="h2">
      {children}
    </Heading>
  );
};

const H2: FC = ({ children }) => {
  return (
    <Heading as="h2" mb={4}>
      {children}
    </Heading>
  );
};

const H3: FC = ({ children }) => {
  return <Heading as="h3">{children}</Heading>;
};

const P: FC = ({ children }) => {
  return <Text my={4}>{children}</Text>;
};

const Ul: FC = ({ children }) => {
  return (
    <UnorderedList ml={0} listStyleType="none" spacing={2} mb={4}>
      {children}
    </UnorderedList>
  );
};

const Ol: FC = ({ children }) => {
  return (
    <OrderedList spacing={3} mb={6}>
      {children}
    </OrderedList>
  );
};

const Li: FC = ({ children }) => {
  return (
    <ListItem>
      <ListIcon
        mr={5}
        verticalAlign="initial"
        color="grey.shadow"
        fontSize="xs"
        as={TriangleIcon}
      />
      {children}
    </ListItem>
  );
};

const Blockqoute: FC = ({ children }) => {
  return (
    <Box
      as="blockquote"
      bg="blockquote"
      borderLeftWidth="5px"
      borderLeftStyle="solid"
      borderLeftColor="secondary.500"
      borderRadius="3xl"
      borderTopLeftRadius="0"
      color="#000"
      px={6}
      py={8}
      my={6}
    >
      {children}
    </Box>
  );
};

type PageBodyProps = {
  content: string;
};

const components = {
  h1: H1,
  h2: H2,
  h3: H3,

  p: P,
  img: ({ title, alt, src }: { title: string; alt: string; src: string }) => {
    return <Img title={title} alt={alt} src={src} />;
  },
  a: A,
  ul: Ul,
  ol: Ol,
  li: Li,
  blockquote: Blockqoute,
};

const PageBody: FC<PageBodyProps> = ({ content }) => {
  return (
    <Box
      as="article"
      maxW="2xl"
      px={[4, 4, 0]}
      color="grey.charcoal"
      fontSize="lg"
      margin="0 auto"
      lineHeight="2"
    >
      {/* @ts-ignore */}
      <ReactMarkdown components={components}>{content}</ReactMarkdown>
    </Box>
  );
};

export default PageBody;
