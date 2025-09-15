export class AppVersionNotificationDTO {
  constructor({
    platform,
    version,
    min_version,
    notes,
    features,
    release_date,
    enabled,
  }) {
    this.platform = platform;
    this.latestVersion = version;
    this.minSupportedVersion = min_version;
    this.notes = notes;
    this.features = features;
    this.releaseDate = release_date;
    this.enabled = enabled;
  }
}
