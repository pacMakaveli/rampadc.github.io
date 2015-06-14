package
{
	import flash.geom.Point;

	public class Attack
	{
		private var _target:Point;
		private var _origin:Point;
		private var _landingDate:Date;
		private var _launchDate:Date;
		private var _fakeUnitType:String;
		private var _attackUnitType:String;
		private var _fake:Boolean;
		
		public function Attack(origin:Point, target:Point, landingDate:Date, launchDate:Date, attackUnitType:String=null, fakeUnitType:String=null)
		{
			_origin = new Point(origin.x, origin.y);
			_target = new Point(target.x, target.y);
			_landingDate = new Date(landingDate);
			_launchDate = new Date(launchDate);
			_attackUnitType = attackUnitType;
			_fakeUnitType = fakeUnitType;
			_fake = (_fakeUnitType != null ? true : false);
		}

		public function get fake():Boolean
		{
			return _fake;
		}

		public function set fake(value:Boolean):void
		{
			_fake = value;
		}

		public function get attackUnitType():String
		{
			return _attackUnitType;
		}

		public function set attackUnitType(value:String):void
		{
			_attackUnitType = value;
		}

		public function get fakeUnitType():String
		{
			return _fakeUnitType;
		}

		public function set fakeUnitType(value:String):void
		{
			_fakeUnitType = value;
		}

		public function get launchDate():Date
		{
			return _launchDate;
		}

		public function set launchDate(value:Date):void
		{
			_launchDate = value;
		}

		public function get landingDate():Date
		{
			return _landingDate;
		}

		public function set landingDate(value:Date):void
		{
			_landingDate = value;
		}

		public function get origin():Point
		{
			return _origin;
		}

		public function set origin(value:Point):void
		{
			_origin = value;
		}

		public function get target():Point
		{
			return _target;
		}

		public function set target(value:Point):void
		{
			_target = value;
		}

	}
}