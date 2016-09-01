const categoriesFormattedForDropdown = (categories) => {
    return categories.map(category => {
        return {
            value: category.id,
            text: category.name
        };
    });
};

export {
    categoriesFormattedForDropdown
};