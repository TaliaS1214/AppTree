class UserMailer < ActionMailer::Base
  default from: 'mailer@apptree.io'

  def welcome_email(user)
    @user = user
    @url = 'http://apptree.io/#signin-or-signup'
    mail(to: @user.email, subject: 'Welcome to AppTree!')
  end

end
