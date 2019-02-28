class ReportsController < ApplicationController
  def index
    render "aaa"
  end

  def create
    json_request = JSON.parse(request.body.read)
    @report = Report.new(json_request)
    @report.save

  end

  def options
    head 200
  end
end
