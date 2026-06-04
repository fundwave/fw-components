# fw-avatar-group

FW Avatar Group component is used to show a list of items as avatars. It also displays a detailed list on clicking any avatar.

## Installation

```
npm i @fw-components/fw-avatar
```

## Example usage

```html
let users = [{name: "Richard", company: "PiedPiper"},{name: "Dinesh", company: "PiedPiper"},{name: "Jared", company: "PiedPiper"}]
<fw-avatar-group .items="${users}" nameAttribute="name" secondaryAttribute="company"></fw-avatar-group>
```

## API

### Properties/Attributes

| Name                 | Type    | Default                            | Description                                                         |
| -------------------- | ------- | ---------------------------------- | ------------------------------------------------------------------- |
| items                | Array   | []                                 | data as Array of objects                                            |
| nameAttribute        | String  | "userName"                         | key in item used to display initials on avatar and title on list    |
| secondaryAttribute   | String  | null                               | key in item used to display secondary line for the item in the list |
| maxCount             | Number  | 5                                  | max count of avatars to be displayed in the group                   |
| header               | String  | "Members"                          | header of the list                                                  |
| avatarBackground     | String  | custom hsl for item[nameAttribute] | background for the avatar                                           |
| primaryAction\*      | Object  | null                               | action to be displayed on top of list                               |
| showSearchBar        | Boolean | false                              | show search bar for the items                                       |
| emptyStateMessage    | String  | null                               | message to be displayed when state is empty while searching         |
| emptyStateAction\*\* | Object  | null                               | action to be displayed when state is empty while searching          |
| secondaryAction\*\*  | Object  | null                               | action to be displayed at bottom of list                            |
| absolute             | Boolean | false                              | if true, list is positioned absolute on devices with width < 767px  |

\*primaryAction => {title : 'Title for the action button', icon : 'mwc-icon to show next to button, default to add_circle'}

\*\*empty state/secondary action => {title : 'Title for the action button', closeDialog : 'boolean to close the dialog on click'}

### Methods

_None_

### Events

| Event Name                 | Detail                         | Description                                                                          |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------ |
| item-clicked               | { item }                       | Fired when an item is clicked from the list, includes the item as detail             |
| primary-action-clicked     | null                           | Fired when primary action is clicked                                                 |
| secondary-action-clicked   | null                           | Fired when secondary action is clicked                                               |
| empty-state-action-clicked | { value : "search bar value" } | Fired when empty state action is clicked, includes value in the search bar as detail |

### CSS Custom Properties

fw-avatar-group uses fw-avatar internally

#### Global Custom Properties

| Name        | Description                  |
| ----------- | ---------------------------- |
| dark-color  | color of text on avatar      |
| light-color | border of overlapping avatar |

# fw-avatar

FW Avatar component is used to show an avatar

## Installation

```
npm i @fw-components/fw-avatar
```

## Example usage

```html
<fw-avatar type="initials" name="Richard Hendricks"></fw-avatar>
```

## API

### Properties/Attributes

| Name   | Type   | Default                       | Description                               |
| ------ | ------ | ----------------------------- | ----------------------------------------- |
| name   | String | null                          | name used for initials                    |
| title  | String | name                          | title visible on hover, defaults to name  |
| type   | String | none                          | type of avatar initials/image             |
| color  | String | custom hsl for name or 'plum' | color of avatar                           |
| imgSrc | String | null                          | src of image when type of avatar is image |

### Methods

_None_

### Events

_None_

### CSS Custom Properties

| Name         | Default | Description          |
| ------------ | ------- | -------------------- |
| avatar-color | white   | text color on avatar |
| avatar-size  | 30px    | size of avatar       |
| border       | none    | border of avatar     |

#### Global Custom Properties

| Name        | Description                    |
| ----------- | ------------------------------ |
| font-family | font-family for text on avatar |
