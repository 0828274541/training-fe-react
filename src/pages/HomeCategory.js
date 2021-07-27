import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import {
  Box, Divider
} from '@material-ui/core';
import { categoriesApi } from '../apis';
import HomeList from './HomeList';

export default function CategoryHome() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setcategoryId] = useState();
  async function getCategory() {
    const result = await categoriesApi.getCategory();
    if (result.data.code === 200) {
      const { docs: categoriesData } = result.data.categories;
      if (categoriesData.length) {
        categoriesData.unshift({ _id: 'all', title: 'Tất cả' });
        setCategories(categoriesData);
      } else {
        setCategories([{ _id: 'all', title: 'Tất cả' }]);
      }
    }
  }
  function handleOnclick(id) {
    setcategoryId(id);
  }
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <>
      <Container maxWidth="md" style={{ minHeight: '393px' }}>
        <Box display="flex" justifyContent="flex-start">
          {!!categories.length && categories.map((option, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TextField color="secondary" key={index} onClick={() => handleOnclick(option._id)} style={{ margin: '10px', backgroundColor: '#a5fff6' }}>
              {option.title}
            </TextField>
          ))}
        </Box>
        <Divider />
        <HomeList id={categoryId} pageDefault={1} />
      </Container>
    </>
  );
}
