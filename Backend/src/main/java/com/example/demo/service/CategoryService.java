package com.example.demo.service;

import com.example.demo.entity.Category;
import com.example.demo.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(Long id) {
        return categoryRepository.findById(id).orElse(null);
    }

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category request) {

        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            return null;
        }

        category.setName(request.getName());

        return categoryRepository.save(category);
    }

    public boolean delete(Long id) {

        Category category = categoryRepository.findById(id).orElse(null);

        if (category == null) {
            return false;
        }

        categoryRepository.delete(category);
        return true;
    }
}