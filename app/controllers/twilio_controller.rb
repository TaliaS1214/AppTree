class TwilioController < ApplicationController

  def index
    self.send_text_message
  end

  def send_text_message
    number_to_send_to = "+12482026504"

    twilio_sid = ENV["TWILIO_SID"]
    twilio_token = ENV["TWILIO_TOKEN"]
    twilio_phone_number = "6463627277"

    puts twilio_sid

    @twilio_client = Twilio::REST::Client.new twilio_sid, twilio_token

    @twilio_client.account.sms.messages.create(
    :from => "+1#{twilio_phone_number}",
    :to => number_to_send_to,
    :body => "Thanks for using Discovr! Here's the app download link: "
    )
 end
end
