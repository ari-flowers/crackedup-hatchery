require 'omniauth-oauth2'

module OmniAuth
  module Strategies
    class DragonCave < OmniAuth::Strategies::OAuth2
      option :name, :dragon_cave

      option :client_options, {
        site: 'https://dragcave.net',
        authorize_url: '/oauth/authorize',
        token_url: '/oauth/token'
      }

      uid { raw_info['id'] }

      info do
        {
          username: raw_info['username']
        }
      end

      def raw_info
        @raw_info ||= access_token.get('/api/v1/user').parsed
      end
    end
  end
end
