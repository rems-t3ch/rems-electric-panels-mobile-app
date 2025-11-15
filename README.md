# REMS Electric Panels Mobile App

## Summary
<p align="justify">
REMS Electric Panels Mobile Application is a comprehensive solution for managing electrical panel inventory and maintenance operations. Built with React Native, Expo, and TypeScript, this cross-platform mobile application enables real-time tracking, monitoring, and management of electrical panel assets. The application follows a layered architecture approach with clear separation of concerns and implements the Assembler pattern for robust data transformation between layers.
</p>

## Features
- Cross-Platform Mobile Application (iOS & Android)
- RESTful API Integration
- Layered Architecture Pattern
- Assembler Pattern for Data Transformation
- Real-time Panel Status Monitoring
- Pull-to-Refresh Functionality
- Stack-based Navigation for Editing
- Tab-based Navigation for Main Features
- Form Validation and State Management
- Automatic List Refresh on Data Changes
- TypeScript Type Safety
- NativeWind (Tailwind CSS) Styling
- Custom Reusable Components
- Environment-based Configuration

## Technology Stack
- **Framework:** React Native 0.81.5 with Expo 54.0.0
- **Language:** TypeScript 5.9.2
- **Router:** Expo Router 5.0.0
- **HTTP Client:** Axios 1.13.2
- **Styling:** NativeWind (Tailwind CSS 3.4.0)
- **State Management:** React Hooks
- **Date Handling:** @react-native-community/datetimepicker 8.2.0
- **Code Quality:** ESLint 9.25.1 & Prettier 3.2.5

## Architecture

The application follows a layered architecture approach, organized into distinct layers with clear separation of concerns:

### Domain Layer
The Domain layer contains the core business entities and types, independent of external frameworks and infrastructure.

**Entities:**
- **ElectricalPanel:** Core entity representing an electrical panel with properties including:
  - Unique identifier
  - Name and location
  - Brand and amperage capacity
  - Manufacturing and installation years
  - Operational state (operative, maintenance, out_of_service)

**Types:**
- **PanelState:** Type-safe enumeration of panel operational states with display mappings

### Infrastructure Layer
The Infrastructure layer handles external concerns such as API communication and data transformation.

**API Services:**
- **HTTP Client:** Axios-based HTTP client with request/response interceptors for logging and error handling
- **PanelApiService:** Provides CRUD operations for electrical panels:
  - Fetch all panels
  - Fetch panel by ID
  - Create new panel
  - Update existing panel
  - Delete panel

**Assemblers:**
- **PanelAssembler:** Implements the Assembler pattern for bidirectional transformation between API payloads and domain entities:
  - Transform API resources to domain entities
  - Transform API responses to entity collections
  - Transform domain entities to API payloads
  - Generate update payloads with optional fields
  - Handle HTTP status codes (200, 201)

<p align="justify">
This layer serves as a data transformation layer, protecting the core application from external data structures and ensuring clean boundaries between layers.
</p>

### Application Layer
The Application layer orchestrates business workflows and manages application state.

**Custom Hooks:**
- **useElectronicPanel:** Centralized hook providing comprehensive panel management capabilities:
  - State management for panels collection and current panel
  - Loading and error state handling
  - CRUD operations with automatic state updates
  - Clear error and panel state utilities
  - Callback-based implementation for optimal performance

### Presentation Layer
The Presentation layer handles user interface and user interactions.

**Screens:**
- **BoardsListScreen:** 
  - Displays all electrical panels in a scrollable list
  - Pull-to-refresh functionality
  - Automatic refresh on screen focus
  - Loading and error state visualization
  - Empty state handling
  - Delete confirmation dialogs

- **CreateBoardScreen:** 
  - Dual-mode screen for creating and editing panels
  - Create mode: Empty form with all fields editable
  - Edit mode: Pre-populated form with restricted field editing (only location and state)
  - Stack-based navigation for editing operations
  - Tab-based navigation for creation
  - Form validation and submission handling
  - Success/error feedback with native alerts

**Components:**
- **BoardForm:** 
  - Controlled form component with forwardRef pattern
  - Dynamic field enabling/disabling based on mode
  - Date pickers for year selection
  - Status toggle buttons
  - Real-time form state management
  - Automatic form reset after successful creation

- **BoardItem:** 
  - Individual panel card component
  - Dynamic status color coding
  - Edit and delete action buttons
  - Responsive layout with shadow effects
  - Navigation to edit screen with panel data

**Shared Components:**
- **CustomButton:** Reusable button with multiple variants (primary, secondary, outline), disabled state, and customizable styling
- **CustomInput:** Reusable text input with label, placeholder, and editable state support

## Features Overview

### Panel Management

<p>
The Panel Management features handle the complete lifecycle of electrical panel assets, from creation to deletion. The application implements the following capabilities:
</p>

**Panel Creation:**
- Create new electrical panel records with complete specifications
- Input validation for all required fields
- Year-based date selection for manufacturing and installation
- Initial state assignment
- Automatic form reset post-creation
- Navigation to panel list after successful creation

**Panel Retrieval:**
- Fetch all panels with automatic state management
- Fetch individual panel by unique identifier
- Real-time data synchronization
- Pull-to-refresh capability
- Automatic refresh on screen focus
- Loading state indicators
- Error handling with user feedback

**Panel Update:**
- Edit existing panel information with restricted field access
- Editable fields in update mode:
  - Location (physical installation location)
  - State (operational status)
- Read-only fields in update mode:
  - Name
  - Brand
  - Amperage capacity
  - Manufacturing year
  - Installation year
- Stack-based navigation for seamless user experience
- Automatic list refresh after update
- Success confirmation feedback

**Panel Deletion:**
- Delete panel with confirmation dialog
- Cascade cleanup in local state
- Automatic list refresh post-deletion
- Error handling for failed deletions

**Panel Status Management:**
- Track three operational states:
  - **Operative:** Panel is fully functional and in service
  - **Maintenance:** Panel is undergoing maintenance procedures
  - **Out of Service:** Panel is inactive or decommissioned
- Visual status indicators with color coding:
  - Operative: Green (#16a34a)
  - Maintenance: Yellow (#eab308)
  - Out of Service: Red (#dc2626)
- Real-time status updates

<p align="justify">
The implementation includes comprehensive error handling, loading states, and user feedback mechanisms to ensure a robust user experience. It follows the Assembler pattern to maintain clean separation between API contracts and application entities, protecting the core application logic from external changes.
</p>

## Navigation Structure

The application implements a hybrid navigation strategy combining tab-based and stack-based navigation:

**Tab Navigation:**
- Home tab
- Dashboard tab (Panel list)
- Create tab (New panel creation)

**Stack Navigation:**
- Edit screen (Overlays current view for editing operations)
- Automatic back navigation after updates

## Environment Configuration

The application supports environment-based configuration through `.env` file:

```
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android
```

## Code Quality

The project maintains high code quality standards through:
- ESLint configuration with Expo and Prettier integration
- TypeScript strict mode
- Prettier code formatting
- Module path aliases for clean imports
- Comprehensive JSDoc documentation

## Scripts

- `npm start` - Start Expo development server
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Auto-fix linting issues and format code
- `npm run prebuild` - Generate native projects

## Project Structure

```
src/
├── app/                    # Expo Router app directory
│   ├── (tabs)/            # Tab navigation screens
│   └── board/             # Stack navigation screens
├── application/           # Application layer (hooks)
├── core/                  # Core types and utilities
├── domain/                # Domain entities and value objects
├── infrastructure/        # API services and assemblers
├── presentation/          # UI components and screens
└── shared/                # Shared utilities and components
```

## Contributors

<p align="justify">
This project is developed and maintained by the REMS T3CH team. We welcome contributions from developers who are passionate about building high-quality mobile applications. Whether you want to fix bugs, add new features, improve documentation, or suggest enhancements, your contributions are greatly appreciated!
</p>

### How to Contribute

If you'd like to collaborate on this project, please follow these steps:

1. **Fork the repository** - Create your own copy of the project
2. **Create a feature branch** - `git checkout -b feature/YourFeatureName`
3. **Make your changes** - Implement your improvements or fixes
4. **Test thoroughly** - Ensure your changes work correctly
5. **Commit your changes** - `git commit -m 'Add: Brief description of your changes'`
6. **Push to your branch** - `git push origin feature/YourFeatureName`
7. **Open a Pull Request** - Submit your changes for review

<p align="justify">
Before submitting a pull request, please make sure your code follows the project's coding standards and passes all linting checks. We encourage you to open an issue first to discuss significant changes or new features. For questions, suggestions, or collaboration inquiries, feel free to reach out to the development team. We look forward to your contributions!
</p>