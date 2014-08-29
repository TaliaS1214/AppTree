module AppStore

  def self.search(term)
    results = JSON.parse(HTTParty.get(URI.escape("https://itunes.apple.com/search?term=#{term}&entity=software")))['results']

    app_details_array = []
    results.each do |app|
      app_details_array << {
        name: app['trackName'],
        tags: app['genres'],
        screenshot_urls: app['screenshotUrls'].join(','),
        release_date: DateTime.parse(app['releaseDate']).strftime('%m/%d/%d'),
        creator: app['artistName'],
        price: app['price'],
        small_avatar_url: app['artworkUrl60'],
        large_avatar_url: app['artworkUrl512'],
        track_view_url: app['trackViewUrl'],
        description: app['description']
      }
    end

    app_details_array
  end

end
