# E-commerce Catalog Project Documentation

## Introduction
The E-commerce Catalog project is designed to provide a robust and scalable solution for managing product catalogs in an online store. This documentation outlines the project's structure, key features, technologies and solutions implemented.

## Project Structure
The project is organized into several key directories and files:

- `src/`: Contains the source code for the application.
    - `app/`: Contains the store config and rtk hooks.
        - `hooks.ts`: Central hub for re-exporting pre-typed Redux hooks.
    - `components/`: Contains UI components.
    - `features/`: Contains feature-specific logic and components.


## Overall Design Choices and Approach

### Design Choices
1. **Modular Architecture**: The project is divided into distinct features such as authentication, product listing, filtering, and pagination. This modular approach ensures that each feature is self-contained and can be developed, tested, and maintained independently.
2. **State Management**: Redux Toolkit is used for state management, ensuring a predictable state container and enabling powerful debugging capabilities with Redux DevTools.
3. **API Interaction**: API interactions are managed using Redux slices, which encapsulate the logic for fetching data and updating the state.
4. **Responsive Design**: Tailwind CSS is used to ensure a responsive and mobile-friendly user interface.

### Challenges and Solutions
- **Challenge**: Handling complex filtering logic with multiple criteria.
    - **Solution**: Implemented a custom hook (`useIndexFilter`) to manage filtering logic and state updates efficiently.
- **Challenge**: Ensuring a responsive and user-friendly interface.
    - **Solution**: Used Tailwind CSS for responsive design and ensured that all components are mobile-friendly.

### Potential Improvements
- **Enhanced Search Functionality**: Implement fuzzy search to improve search accuracy.
- **User Reviews**: Add a feature for users to leave reviews and ratings for products.
- **Wishlist**: Implement a wishlist feature for users to save their favorite products.

### API Design
- **Authentication/Authorization**: JWT tokens are used for authentication, ensuring secure access to protected endpoints.

### Front-End Implementation
- **Functionality**: The front-end components interact seamlessly with the API, fetching and displaying data dynamically.
- **User Interface**: The UI is responsive and user-friendly, with components styled using Tailwind CSS.
- **Dynamic Filtering**: Users can filter products based on various attributes, including custom attributes.


## API Endpoint Design

### Endpoints
1. **Create a New Product**
    - **Endpoint**: `POST /api/products/`
    - **Request Format**:
      ```json
      {
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "categories": [1, 2],
        "attributes": {
          "color": "red",
          "size": "M"
        }
      }
      ```
    - **Response Format**:
      ```json
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "categories": [1, 2],
        "attributes": {
          "color": "red",
          "size": "M"
        }
      }
      ```

2. **Retrieve Product Details**
    - **Endpoint**: `GET /api/products/{id}`
    - **Response Format**:
      ```json
      {
        "id": 1,
        "name": "Product Name",
        "description": "Product Description",
        "price": 100,
        "categories": [1, 2],
        "attributes": {
          "color": "red",
          "size": "M"
        }
      }
      ```

3. **Update Product Details**
    - **Endpoint**: `PUT /api/products/{id}`
    - **Request Format**:
      ```json
      {
        "name": "Updated Product Name",
        "description": "Updated Product Description",
        "price": 120,
        "categories": [1, 3],
        "attributes": {
          "color": "blue",
          "size": "L"
        }
      }
      ```
    - **Response Format**:
      ```json
      {
        "id": 1,
        "name": "Updated Product Name",
        "description": "Updated Product Description",
        "price": 120,
        "categories": [1, 3],
        "attributes": {
          "color": "blue",
          "size": "L"
        }
      }
      ```

4. **Delete a Product**
    - **Endpoint**: `DELETE /api/products/{id}`
    - **Response Format**:
      ```json
      {
        "message": "Product deleted successfully"
      }
      ```

5. **Search Products**
    - **Endpoint**: `GET /api/products?name={name}&category={category}&attributes={attributes}`
    - **Response Format**:
      ```json
      {
        "results": [
          {
            "id": 1,
            "name": "Product Name",
            "description": "Product Description",
            "price": 100,
            "categories": [1, 2],
            "attributes": {
              "color": "red",
              "size": "M"
            }
          }
        ],
        "meta": {
          "total_count": 1,
          "page": 1,
          "page_size": 10
        }
      }
      ```



