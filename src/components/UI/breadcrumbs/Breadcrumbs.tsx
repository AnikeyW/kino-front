import React, { FC } from "react";
import styles from "./Breadcrumbs.module.scss";
import LinkBtn from "@/components/UI/myLink/linkBtn/LinkBtn";
import { MdArrowForwardIos } from "react-icons/md";

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
    <div className={styles.root}>
      {breadcrumbs.map((breadcrumb) => (
        <BreadcrumbItem breadcrumb={breadcrumb} key={breadcrumb.path} />
      ))}
      <span>{lastBreadcrumb?.title}</span>
    </div>
  );
};

export default Breadcrumbs;

const BreadcrumbItem: FC<{ breadcrumb: IBreadcrumb }> = ({ breadcrumb }) => {
  return (
    <>
      <LinkBtn href={breadcrumb.path}>{breadcrumb.title}</LinkBtn>
      <MdArrowForwardIos size={16} />
    </>
  );
};
