import React, { FC, useState, useCallback } from "react";
import {
  Box,
  Link as ChakraLink,
  IconButton,
  Stack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { getRemovedAccents } from "../../util/removeAccents";
import { useCurrentBreakpoint, useMenu } from "../../hooks";

import {
  ChevronDownIcon,
  OutsideIcon,
  HamburgerIcon,
  CloseIcon,
} from "../icons";

import { headerPX } from "./consts";
import Contact from "./Contact";
import { MenuContext } from "../../hooks/useMenu";

type LinkItemProps = {
  href: string;
  css?: any;
};

const LinkItem: FC<LinkItemProps> = ({ children, href, css }) => {
  const { onClose } = useMenu();
  const { asPath } = useRouter();
  const currentPage = asPath.includes(href);

  return (
    <NextLink href={href} passHref>
      <a>
        <Box
          onClick={onClose}
          color={
            currentPage ? "secondary.500" : ["white", "white", "white", "black"]
          }
          cursor="pointer"
          _hover={{
            transform: "scale(1.02)",
          }}
          {...css}
        >
          {children}
        </Box>
      </a>
    </NextLink>
  );
};

const productCategories = [
  "Felületkezelés",
  "Fényezőfülkék",
  "Tüzeléstechnika",
  "Szórástechnika",
];

type ProductCategoriesProps = {
  show: boolean;
};

const ProductCategories: FC<ProductCategoriesProps> = ({ show }) => {
  const { isLg } = useCurrentBreakpoint();

  if (!show) {
    return null;
  }

  if (isLg) {
    return (
      <Box
        pt={2}
        position="absolute"
        top={6}
        shadow="sm"
        left={-4}
        borderBottomRadius="2xl"
        bg="background"
      >
        {productCategories.map((category, i) => {
          const lowcase = category.toLowerCase();
          const href = `/termekek/${getRemovedAccents(lowcase)}`;
          return (
            <Box key={category}>
              <LinkItem
                href={href}
                css={{
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                {category}
              </LinkItem>
              {i + 1 < productCategories.length && (
                <Box height={0.25} width="100%" backgroundColor="curtain.2" />
              )}
            </Box>
          );
        })}
      </Box>
    );
  }

  return (
    <Stack alignItems="flex-end" mt={6}>
      {productCategories.map((category) => {
        const lowcase = category.toLowerCase();
        const href = `/termekek/${getRemovedAccents(lowcase)}`;
        return (
          <LinkItem
            key={category}
            href={href}
            css={{
              paddingTop: "12px",
              paddingBottom: "12px",
              paddingLeft: "16px",
              fontSize: "lg",
            }}
          >
            {category}
          </LinkItem>
        );
      })}
    </Stack>
  );
};

const Products: FC = ({ children }) => {
  const { pathname } = useRouter();
  const currentPage = pathname.includes("termekek");

  const { isLg } = useCurrentBreakpoint();

  const [show, setShow] = useState(false);

  const onOpen = useCallback(() => {
    setShow(true);
  }, []);

  const onClose = useCallback(() => {
    setShow(false);
  }, []);

  const toggleShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  return (
    <Flex
      direction="column"
      position="relative"
      zIndex={1}
      onClick={!isLg ? toggleShow : null}
      onMouseEnter={isLg ? onOpen : null}
      onMouseLeave={isLg ? onClose : null}
    >
      <Flex align="center" justify="flex-end">
        {children}
        <ChevronDownIcon
          ml={3}
          transform={show ? "rotate(180deg)" : "none"}
          transitionDuration="0.2s"
          fill="none"
          width={3}
          color={currentPage && "secondary.500"}
        />
      </Flex>
      <ProductCategories show={show} />
    </Flex>
  );
};

type NavItemProps = {
  href?: string;
};

const NavItem: FC<NavItemProps> = ({ children, href }) => {
  const { onClose } = useMenu();

  if (children === "Karrier") {
    return (
      <ChakraLink
        onClick={onClose}
        isExternal
        href={href}
        color={["white", "white", "white", "black"]}
        cursor="pointer"
        _hover={{
          transform: "scale(1.02)",
        }}
      >
        <Flex direction="row" align="center">
          {children}
          <OutsideIcon />
        </Flex>
      </ChakraLink>
    );
  }

  if (children === "Termékek") {
    return <Products>{children}</Products>;
  }

  return <LinkItem href={href}>{children}</LinkItem>;
};

const NavItems: FC = () => {
  return (
    <Stack
      spacing={12}
      align={["flex-end", "flex-end", "flex-end", "baseline"]}
      direction={["column", "column", "column", "row"]}
    >
      <NavItem href="/termekek">Termékek</NavItem>
      <NavItem href="/referenciak">Referenciák</NavItem>
      <NavItem href="/cikkek">Cikkek</NavItem>
      <NavItem href="/kapcsolat">Kapcsolat</NavItem>
      <NavItem href="https://www.profession.hu/allasok/dewa-zrt/1,0,0,0,0,0,0,0,0,0,38885">
        Karrier
      </NavItem>
      <Contact />
    </Stack>
  );
};

const Navlist: FC = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const { isLg } = useCurrentBreakpoint();

  if (isLg) {
    return <NavItems />;
  }

  return (
    <MenuContext.Provider value={{ isOpen, onClose, onOpen, onToggle }}>
      <IconButton
        alignSelf="center"
        bg="transparent !important"
        aria-label="Menu"
        onClick={onOpen}
        icon={<HamburgerIcon w="36px" h="21px" />}
      />
      <Drawer size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay background="backdrop" />
        <DrawerContent borderLeftRadius="xl" bg="primary.700" color="white">
          <DrawerHeader d="flex" justifyContent="flex-end" px={headerPX}>
            <IconButton
              alignSelf="flex-end"
              bg="transparent !important"
              aria-label="Menu"
              onClick={onClose}
              icon={<CloseIcon boxSize="21px" />}
            />
          </DrawerHeader>
          <DrawerBody fontSize="2xl" px={12}>
            <NavItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MenuContext.Provider>
  );
};

export default Navlist;
