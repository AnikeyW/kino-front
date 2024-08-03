import React, { FC } from "react";
import styles from "./Breadcrumbs.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";
import ArrowRightIcon from "@/components/UI/arrowRightIcon/ArrowRightIcon";

interface IBreadcrumb {
  path: string;
  title: string;
}

interface Props {
  breadcrumbs: IBreadcrumb[];
}

const Breadcrumbs: FC<Props> = ({ breadcrumbs }) => {
  const lastBreadcrumb = breadcrumbs.pop();

  return (
    <nav className={styles.root}>
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem breadcrumb={breadcrumb} key={breadcrumb.path} />
      ))}
      <span>{lastBreadcrumb?.title}</span>
    </nav>
  );
};

export default Breadcrumbs;

const BreadcrumbItem: FC<{ breadcrumb: IBreadcrumb }> = ({ breadcrumb }) => {
  return (
    <>
      <LinkBtn href={breadcrumb.path}>{breadcrumb.title}</LinkBtn>
      <ArrowRightIcon />
    </>
  );
};
