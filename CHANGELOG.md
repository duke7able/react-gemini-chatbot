# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## 1.3.1 (2025-03-07)

### Fix

- Issue of leadform ui solve
- Add try and catch in api calling

## 1.2.5 (2025-03-06)

### Features

- **LeadForm Feature:**
  - Added the ability to enable a customizable lead form through the `enableLeadForm` flag.
  - The form can be default with fields such as `Company Name`, `Email`, `Phone Number`, and `Custom Fields` (like dropdowns and text inputs).
  - You can configure the form position with `enableFormAt` and provide various field options, such as `title`, `placeholder`, `type`, `validationMessage`, and `required` to add your own fields.
  - Optionally, the form can be linked to an API to submit the collected data using `submitApiEndPoint`, `submitApiAccessToken`, and `APIFormHttpMethod`.
  - Fields are optional and can be added or removed from the form dynamically based on configuration.

## 1.2.4 (2025-03-05)

### Fixes

- Fixed an issue where the textPosition change type was incorrectly set to string instead of boolean.
- Fixed the image format and changed the image type to `embeddedUri`.

### Features

- Users can now add a backend endpoint (`apiStoreResponseDataEndpoint`) to store every conversation between the chatbot and the user.
- Users can also add an optional access token (`accessTokenOfApi`) for authentication. It is not mandatory.
- users can also add http method(`ApiHttpMethod`) (eg. post,put,get) based on backend api and also it is optional and default it take post.

### 1.2.3 (2025-03-05)

#### Fixes

- Fixed an issue with file input and upload functionality.
- Fixed the image path handling issue.
