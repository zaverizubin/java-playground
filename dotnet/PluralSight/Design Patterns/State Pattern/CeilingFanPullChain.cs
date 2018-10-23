namespace State_Pattern
{
    class CeilingFanPullChain
    {
        private State _currentState;

        public CeilingFanPullChain()
        {
            _currentState = new Off();
        }

        public void SetState(State s)
        {
            _currentState = s;
        }

        public void Pull()
        {
            _currentState.Pull(this);
        }
    }
}
