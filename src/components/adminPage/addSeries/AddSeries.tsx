"use client";
import React, { FormEvent } from "react";
import { CreateSeriesDto, seriesService } from "@/services/series.service";

const AddSeries = () => {
  const addSeriesHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      releaseYear: formData.get("releaseYear") as string,
      poster: formData.get("poster") as File,
    };
    seriesService.addSeries(data);
  };

  return (
    <form onSubmit={addSeriesHandler}>
      <div>
        <input type="text" placeholder={"Название"} name={"title"} />
      </div>
      <div>
        <input type="text" placeholder={"Описание"} name={"description"} />
      </div>
      <div>
        <input type="text" placeholder={"Год выпуска"} name={"releaseYear"} />
      </div>
      <div>
        <input type="file" name={"poster"} accept="image/png, image/jpeg" />
      </div>
      <button type={"submit"}>добавиить</button>
    </form>
  );
};

export default AddSeries;
