class Api::PeopleController < ApplicationController

  def index
    @people = Person.all
    render 'index.json.jbuilder'
  end
end
