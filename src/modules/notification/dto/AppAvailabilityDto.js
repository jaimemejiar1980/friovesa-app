export class AppAvailabilityDto {
  constructor({
    platform,
    subtitle,
    description,
    web_url,
    available,
    enabled,
  }) {
    this.platform = platform;
    this.subtitle = subtitle;
    this.description = description;
    this.webUrl = web_url;
    this.available = available;
    this.enabled = enabled;
  }
}
