from django import template
from datetime import datetime,timezone

register = template.Library()

def date_diff_in_seconds(dt2, dt1):
  timedelta = dt2 - dt1
  return timedelta.days * 24 * 3600 + timedelta.seconds

def days_from_seconds(seconds):
  minutes, seconds = divmod(seconds, 60)
  hours, minutes = divmod(minutes, 60)
  days, hours = divmod(hours, 24)
  return days
	# return (days, hours, minutes, seconds)  

@register.filter(expects_localtime=True)
def diffdays(dt1,dt2):
  return days_from_seconds(date_diff_in_seconds(dt2,dt1))

@register.filter(expects_localtime=True)
def diffdaysnow(dt1):
  print('dt1',dt1)
  dt2 = datetime.now(timezone.utc)
  return days_from_seconds(date_diff_in_seconds(dt2,dt1))  

#register.filter('diffdays', diffdays)

"""
def dhms_from_seconds(seconds):
	minutes, seconds = divmod(seconds, 60)
	hours, minutes = divmod(minutes, 60)
	days, hours = divmod(hours, 24)
	return (days, hours, minutes, seconds)
  #Specified date
date1 = datetime.strptime('2015-01-01 01:00:00', '%Y-%m-%d %H:%M:%S')

#Current date
date2 = datetime.now()

print("\n%d days, %d hours, %d minutes, %d seconds" % dhms_from_seconds(date_diff_in_seconds(date2, date1)))
print()
"""