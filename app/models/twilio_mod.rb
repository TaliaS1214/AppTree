module TwilioMod

  def self.send_text(app, phone_number)
    app_name = app.name.length < 20 ? app.name : app.name[0..20] + "..."
    number_to_send_to = "+1#{phone_number}"
    twilio_sid = ENV["TWILIO_SID"]
    twilio_token = ENV["TWILIO_TOKEN"]
    twilio_phone_number = "6463627277"

    twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    response = twilio_client.account.sms.messages.create(
      :from => "+1#{twilio_phone_number}",
      :to => number_to_send_to,
      :body => "#{app_name}\n\nDownload Link: #{app.track_view_url}"
    )

  end

end
