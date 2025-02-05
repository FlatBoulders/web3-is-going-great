import PropTypes from "prop-types";

export const EMPTY_ENTRY = {
  body: "",
  date: "",
  faicon: "",
  icon: "",
  filters: {
    blockchain: [],
    tech: [],
    theme: [],
  },
  links: [{ linkText: "", href: "", extraText: "" }],
  title: "",
  shortTitle: "",
  readableId: "",
  image: { src: "", alt: "", caption: "", isLogo: false },
  scamTotal: 0,
  scamAmountDetails: {
    total: 0,
    hasScamTotal: false,
  },
  collection: [],
};

export const LinkFieldPropType = PropTypes.shape({
  linkText: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  extraText: PropTypes.string,
});

export const EntryPropType = PropTypes.shape({
  id: PropTypes.string,
  readableId: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    theme: PropTypes.arrayOf(PropTypes.string).isRequired,
    tech: PropTypes.arrayOf(PropTypes.string),
    blockchain: PropTypes.arrayOf(PropTypes.string),
  }),
  color: PropTypes.string,
  collection: PropTypes.array,
  faicon: PropTypes.string,
  icon: PropTypes.string,
  date: PropTypes.string,
  title: PropTypes.string.isRequired,
  shortTitle: PropTypes.string.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    link: PropTypes.string,
    caption: PropTypes.string,
    class: PropTypes.string,
  }),
  body: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(LinkFieldPropType),
  scamAmountDetails: PropTypes.shape({
    total: PropTypes.number.isRequired,
    hasScamTotal: PropTypes.bool.isRequired,
  }).isRequired,
  tweetId: PropTypes.string,
});

const isEntryEmpty = (entry) =>
  JSON.stringify(entry) === JSON.stringify(EMPTY_ENTRY);

export const trimEmptyFields = (entry, imageAttribution, entryAttribution) => {
  const trimmed = {};
  if (!isEntryEmpty(entry)) {
    const newEntry = JSON.parse(JSON.stringify(entry));

    if (!entry.faicon) {
      delete newEntry.faicon;
    }
    if (!entry.icon) {
      delete newEntry.icon;
    }
    if (!entry.image.src) {
      delete newEntry.image;
    } else if (!entry.image.caption) {
      delete newEntry.image.caption;
    }
    if (!entry.collection.length) {
      delete newEntry.collection;
    } else {
      newEntry.collection = entry.collection.filter(
        (entry) => entry.length > 0
      );
      if (!newEntry.collection.length) {
        delete newEntry.collection;
      }
    }
    const filteredLinks = entry.links
      .filter((link) => link.linkText && link.href)
      .map((link) => {
        if (link.extraText) {
          return link;
        } else {
          return { linkText: link.linkText, href: link.href };
        }
      });

    newEntry.links = filteredLinks;
    trimmed.entry = newEntry;
  }
  if (imageAttribution.text && imageAttribution.href) {
    trimmed.imageAttribution = imageAttribution;
  }
  if (entryAttribution.text) {
    trimmed.entryAttribution = entryAttribution;
  }
  return trimmed;
};

export const isValidEntry = (entry, imageAttribution, entryAttribution) => {
  if (!isEntryEmpty(entry)) {
    // Entry is defined, so validate everything necessary is there
    if (!entry.title || !entry.shortTitle || !entry.body || !entry.date) {
      return false;
    }
    if (
      Object.keys(entry.image).some((key) => !!entry.image[key]) &&
      (!entry.image.src || !entry.image.alt)
    ) {
      return false;
    }
    if (entry.date && !entry.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return false;
    }
    if (!entry.faicon && !entry.icon) {
      return false;
    }
  }
  if (
    (imageAttribution.text && !imageAttribution.href) ||
    (!imageAttribution.text && imageAttribution.href)
  ) {
    return false;
  }
  if (!entryAttribution.text && entryAttribution.href) {
    return false;
  }
  return true;
};
